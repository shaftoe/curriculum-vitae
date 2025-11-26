import path from 'path';
import htmlmin from 'html-minifier-terser';
import { generateCVPDF } from './lib/pdf-generator.js';

export default function (eleventyConfig) {
  // Store jobs collection and main data for PDF generation
  let jobsCollection = [];
  let mainData = null;

  // Add jobs collection sorted by filename
  eleventyConfig.addCollection('jobs', collectionApi => {
    jobsCollection = collectionApi.getFilteredByGlob('_jobs/*.md').sort((a, b) => {
      // Extract numbers at the start of filename: _jobs/12_foo.md → 12
      const numA = parseInt(a.inputPath.match(/_jobs\/(\d+)_/)?.[1] || '0', 10);
      const numB = parseInt(b.inputPath.match(/_jobs\/(\d+)_/)?.[1] || '0', 10);
      // sort descending numerically
      return numB - numA;
    });
    return jobsCollection;
  });

  // Store main data during collection processing
  eleventyConfig.addCollection('mainData', collectionApi => {
    // Access the main data that Eleventy has already loaded
    const allItems = collectionApi.getAll();
    const mainItem = allItems.find(item => item.data.main);
    if (mainItem) {
      mainData = mainItem.data.main;
    }
    return mainData ? [mainData] : [];
  });

  // Add commaSeparatedKeywords collection from job technologies and skills
  eleventyConfig.addCollection('commaSeparatedKeywords', collectionApi => {
    const jobs = collectionApi.getFilteredByGlob('_jobs/*.md');
    const allTechnologies = new Set();

    // Add technologies from jobs
    jobs.forEach(job => {
      if (job.data.tech) {
        job.data.tech.forEach(tech => allTechnologies.add(tech));
      }
    });

    // Add skills from main JSON
    const mainDataItem = collectionApi.getAll()[0].data.main;
    if (mainDataItem && mainDataItem.sections) {
      // Add technologies
      if (Array.isArray(mainDataItem.sections.technologies)) {
        mainDataItem.sections.technologies.forEach(tech => allTechnologies.add(tech));
      }
      // Add soft skills
      if (Array.isArray(mainDataItem.sections['soft skills'])) {
        mainDataItem.sections['soft skills'].forEach(skill => allTechnologies.add(skill));
      }
    }

    return Array.from(allTechnologies).sort().join(', ');
  });

  // Prevent job files and README.md from being rendered as individual pages
  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink(data) {
      if (data.page && data.page.inputPath && data.page.inputPath.includes('_jobs/')) {
        return false;
      }

      if (data.page && data.page.inputPath && data.page.inputPath.includes('README.md')) {
        return false;
      }

      return data.permalink;
    },
  });

  // Add build timestamp
  eleventyConfig.addGlobalData('generated', () => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(now);
  });

  // Copy assets to output directory
  eleventyConfig.addPassthroughCopy('bundle.css');
  eleventyConfig.addPassthroughCopy('favicon-16x16.png');

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function (content) {
    if ((this.page.outputPath || '').endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  });

  // Add post-build hook for PDF generation
  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    try {
      console.log('🔄 Starting PDF generation...');

      const jobFiles = jobsCollection.map(job => ({
        filename: path.basename(job.inputPath),
        frontmatter: job.data,
        content: job.content.trim(),
      }));

      const outputPath = path.join(dir.output, mainData.pdf);
      await generateCVPDF(mainData, jobFiles, outputPath);

      console.log('✅ PDF generation completed successfully');
    } catch (error) {
      console.error('❌ Error during PDF generation:', error.message);
    }
  });

  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  };
}
