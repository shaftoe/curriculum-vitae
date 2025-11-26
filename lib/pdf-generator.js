import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export class CVPDFGenerator {
  constructor() {
    this.doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });

    this.currentY = 50;
    this.pageWidth = 595.28; // A4 width in points
    this.contentWidth = this.pageWidth - 100; // Account for margins
    this.lineHeight = 16;
    this.sectionSpacing = 20;
  }

  // Helper method to add text with word wrapping
  addText(text, options = {}) {
    const {
      fontSize = 11,
      font = 'Helvetica',
      color = 'black',
      bold = false,
      italic = false,
      align = 'left',
      maxWidth = this.contentWidth,
    } = options;

    this.doc.font(font).fontSize(fontSize).fillColor(color);

    if (bold) {
      this.doc.font('Helvetica-Bold');
    }
    if (italic) {
      this.doc.font('Helvetica-Oblique');
    }

    const lines = this.doc.text(text, {
      width: maxWidth,
      align,
      lineGap: 2,
    });

    this.currentY += lines.length * (fontSize + 2);
    return this;
  }

  // Helper method to add a new line
  addLine(spacing = this.lineHeight) {
    this.currentY += spacing;
    return this;
  }

  // Helper method to check if we need a new page
  checkPageBreak(requiredSpace = this.lineHeight) {
    if (this.currentY + requiredSpace > 750) {
      // Approximate page height
      this.doc.addPage();
      this.currentY = 50;
    }
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
        fontSize: 24,
        bold: true,
        align: 'center',
      });
      this.addText(parsedJsonData.role, {
        fontSize: 16,
        align: 'center',
        color: '#666',
      });
      this.addLine(this.sectionSpacing);

      // Navigation links (as text)
      this.addText('Contact Information:', { fontSize: 12, bold: true });
      Object.entries(parsedJsonData.nav).forEach(([label, url]) => {
        this.addText(`• ${label}: ${url}`, { fontSize: 10, color: '#666' });
      });
      this.addLine(this.sectionSpacing);

      // Professional Experience
      console.log('💼 Generating professional experience...');
      this.addText('Professional Experience', { fontSize: 16, bold: true });
      this.addLine();

      jobFiles.forEach((job, _index) => {
        this.checkPageBreak(100); // Reserve space for job entry

        // Job title and company
        this.addText(job.frontmatter.title, { fontSize: 14, bold: true });
        this.addText(`${job.frontmatter.company} - ${job.frontmatter.location}`, {
          fontSize: 12,
          color: '#666',
        });
        this.addText(job.frontmatter.period, { fontSize: 10, color: '#999' });
        this.addLine();

        // Job description
        const paragraphs = job.content.split('\n\n');
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            this.addText(paragraph.trim(), { fontSize: 10 });
            this.addLine();
          }
        });

        // Tech stack if available
        if (job.frontmatter.tech && Array.isArray(job.frontmatter.tech)) {
          this.addText('Tech stack:', { fontSize: 10, bold: true });
          const techString = job.frontmatter.tech.join(', ');
          this.addText(techString, { fontSize: 9, color: '#666' });
          this.addLine();
        }

        this.addLine(this.sectionSpacing);
      });

      // Skills sections
      console.log('🎯 Generating skills sections...');
      Object.entries(parsedJsonData.sections).forEach(([sectionName, skills]) => {
        this.checkPageBreak(50);

        const title = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        this.addText(title, { fontSize: 14, bold: true });
        this.addLine();

        skills.forEach(skill => {
          this.addText(`• ${skill}`, { fontSize: 10 });
        });

        this.addLine(this.sectionSpacing);
      });

      // Footer
      this.doc.addPage();
      this.currentY = 50;
      this.addText('Alexander Fortin - Curriculum Vitae', {
        fontSize: 10,
        align: 'center',
        color: '#999',
      });
      this.addText(`Generated on ${new Date().toLocaleDateString()}`, {
        fontSize: 8,
        align: 'center',
        color: '#ccc',
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
