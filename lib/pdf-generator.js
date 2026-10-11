import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const MARGIN = 50;
const PAGE_BOTTOM_LIMIT = 792 - MARGIN - 20; // A4 height (842pt) minus margin & safety buffer

export class CVPDFGenerator {
  constructor() {
    this.doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: MARGIN,
        bottom: MARGIN,
        left: MARGIN,
        right: MARGIN,
      },
      bufferPages: true,
    });
  }

  // Helper method to strip HTML tags
  stripHTMLTags(text) {
    return text.replace(/<[^>]*>/g, '');
  }

  // Helper method to add text: PDFKit flows the cursor down automatically,
  // we just configure comfortable spacing.
  addText(text, options = {}) {
    const {
      fontSize = 11,
      color = 'black',
      bold = false,
      italic = false,
      align = 'left',
      width = this.doc.page.width - MARGIN * 2,
      lineGap = 4,
      paragraphGap = 6,
    } = options;

    let font = 'Helvetica';
    if (bold && italic) font = 'Helvetica-BoldOblique';
    else if (bold) font = 'Helvetica-Bold';
    else if (italic) font = 'Helvetica-Oblique';

    this.doc.font(font).fontSize(fontSize).fillColor(color);

    this.doc.text(text, MARGIN, this.doc.y, {
      width,
      align,
      lineGap,
      paragraphGap,
    });

    return this;
  }

  // Move the cursor down by N lines of the current font size
  moveDown(lines = 1) {
    this.doc.moveDown(lines);
    return this;
  }

  // Check if we need a new page
  checkPageBreak(requiredSpace = 60) {
    if (this.doc.y + requiredSpace > PAGE_BOTTOM_LIMIT) {
      this.doc.addPage();
    }
    return this;
  }

  // Load and parse JSON data
  loadJSONData(jsonData) {
    return jsonData;
  }

  // Load and parse all job markdown files
  loadJobFiles(jobsCollection) {
    return jobsCollection.map(job => {
      return {
        filename: job.filename,
        frontmatter: job.frontmatter,
        content: job.content,
      };
    });
  }

  // Generate the PDF
  async generatePDF(jsonData, jobsCollection, outputPath) {
    try {
      console.log('🚀 Starting native PDF generation...');

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Load data
      console.log('📊 Loading JSON data...');
      const parsedJsonData = this.loadJSONData(jsonData);

      console.log('📄 Loading job markdown files...');
      const jobFiles = this.loadJobFiles(jobsCollection);

      // Set up output file
      const writeStream = fs.createWriteStream(outputPath);
      this.doc.pipe(writeStream);

      // Header
      console.log('📝 Generating header...');
      this.addText(parsedJsonData.name, {
        fontSize: 26,
        bold: true,
        align: 'center',
        paragraphGap: 4,
      });
      this.addText(parsedJsonData.role, {
        fontSize: 15,
        color: '#555',
        align: 'center',
        paragraphGap: 18,
      });

      // Navigation links (as text)
      this.addText('Contact Information:', { fontSize: 12, bold: true, paragraphGap: 4 });
      Object.entries(parsedJsonData.nav).forEach(([label, url]) => {
        this.addText(`• ${label}: ${url}`, { fontSize: 10, color: '#555', paragraphGap: 2 });
      });
      this.moveDown(1.5);

      // Professional Experience
      console.log('💼 Generating professional experience...');
      this.addText('Professional Experience', { fontSize: 17, bold: true, paragraphGap: 14 });

      jobFiles.forEach(job => {
        this.checkPageBreak(160); // Reserve space for job entry

        // Job title and company
        this.addText(job.frontmatter.title, { fontSize: 14, bold: true, paragraphGap: 3 });
        this.addText(
          `${job.frontmatter.company} - ${job.frontmatter.location}`,
          { fontSize: 11, color: '#555', paragraphGap: 2 }
        );
        this.addText(job.frontmatter.period, { fontSize: 10, color: '#888', italic: true, paragraphGap: 8 });

        // Job description
        const cleanContent = this.stripHTMLTags(job.content);
        const paragraphs = cleanContent.split('\n\n');
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            this.addText(paragraph.trim(), { fontSize: 10.5, paragraphGap: 8 });
          }
        });

        // Tech stack if available
        if (job.frontmatter.tech && Array.isArray(job.frontmatter.tech)) {
          this.moveDown(0.3);
          this.addText('Tech stack:', { fontSize: 10, bold: true, paragraphGap: 2 });
          const techString = job.frontmatter.tech.join(', ');
          this.addText(techString, { fontSize: 9.5, color: '#555', paragraphGap: 0 });
        }

        this.moveDown(2.5);
      });

      // Skills sections
      console.log('🎯 Generating skills sections...');
      Object.entries(parsedJsonData.sections).forEach(([sectionName, skills]) => {
        this.checkPageBreak(80);

        const title = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        this.addText(title, { fontSize: 14, bold: true, paragraphGap: 6 });

        this.addText(skills.join(' · '), { fontSize: 10.5, paragraphGap: 0 });
        this.moveDown(2);
      });

      // Footer
      this.doc.addPage();
      this.addText('Alexander Fortin - Curriculum Vitae', {
        fontSize: 10,
        align: 'center',
        color: '#888',
      });
      this.addText(`Generated on ${new Date().toLocaleDateString()}`, {
        fontSize: 8,
        align: 'center',
        color: '#bbb',
      });

      // Finalize PDF
      this.doc.end();

      // Wait for the file to be written
      await new Promise(resolve => {
        writeStream.on('finish', () => {
          console.log(`✅ PDF generated successfully: ${outputPath}`);

          // Get file size
          const stats = fs.statSync(outputPath);
          console.log(`📊 PDF size: ${(stats.size / 1024).toFixed(2)} KB`);
          resolve();
        });
      });
    } catch (error) {
      console.error('❌ Error generating PDF:', error.message);
      throw error;
    }
  }
}

export async function generateCVPDF(jsonData, jobsCollection, outputPath) {
  const generator = new CVPDFGenerator();
  await generator.generatePDF(jsonData, jobsCollection, outputPath);
}
