# Curriculum Vitae

A modern, data-driven curriculum vitae built with [Eleventy](https://www.11ty.dev/) that generates both a responsive web version and a PDF document.

## Features

### 🎨 **Modern Web CV**

- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **Clean UI**: Built with [Pico CSS](https://picocss.com/) framework with custom styling
- **Font Awesome Icons**: Visual icons for navigation links (contact, GitHub, website, PDF)
- **Print-Optimized**: Special print styles for generating PDF-friendly output

### 📄 **Dual Output Format**

- **HTML Version**: Fully responsive web page hosted on Netlify
- **PDF Generation**: Automatically generates a PDF version using PDFKit during build
- **SEO Optimized**: Includes meta tags, keywords, and structured data

### 🗂️ **Data-Driven Architecture**

- **JSON Configuration**: Main CV data stored in `_data/main.json` (personal info, skills, languages, links)
- **Markdown Job Entries**: Each work experience is a separate markdown file in `_jobs/` directory
- **Numbered Sorting**: Jobs are automatically sorted by filename prefix (e.g., `1_company.md`, `2_company.md`)
- **Frontmatter Support**: Each job includes metadata (title, company, location, period, tech stack)

### 🛠️ **Tech Stack Display**

- **Collapsible Details**: Tech stack for each job is shown in expandable `<details>` elements
- **Comma-Separated Lists**: Clean, inline display of technologies
- **Dynamic Keywords**: Automatically generates SEO keywords from job technologies and skills

### 📋 **Structured Sections**

- **Professional Experience**: Chronologically ordered work history
- **Technical Skills**: Comprehensive list of technical competencies
- **Soft Skills**: Professional and interpersonal skills
- **Languages**: Language proficiencies
- **Open Source Projects**: Links to personal projects

### ⚡ **Build & Performance**

- **HTML Minification**: Output HTML is automatically minified
- **Static Generation**: Fast, pre-rendered static site
- **Asset Optimization**: CSS and assets are optimized for production

### 🚀 **Deployment**

- **Netlify Integration**: Configured for automatic deployment via Netlify
- **Build Automation**: PDF generation happens automatically during build process
- **Version Control**: Full Git history for tracking CV updates

## Project Structure

```
.
├── _data/
│   └── main.json          # Main CV data (personal info, skills, links)
├── _includes/
│   ├── base.njk           # Base HTML template
│   └── index.njk         # Main CV content template
├── _jobs/
│   ├── 1_company.md       # Job entries (numbered for sorting)
│   ├── 2_company.md
│   └── ...
├── lib/
│   └── pdf-generator.js   # PDF generation logic
├── _site/                 # Build output directory
├── .eleventy.js          # Eleventy configuration
├── bundle.css            # Custom styles
├── index.md              # Entry point
└── netlify.toml          # Netlify deployment config
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server with live reload:

```bash
npm run serve
```

The site will be available at `http://localhost:8080`

### Build

Generate the static site and PDF:

```bash
npm run build
```

Output will be in the `_site/` directory.

### Other Commands

- `npm run format` - Format code with Prettier
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run clean` - Remove build output directory

## Customization

### Updating Personal Information

Edit `_data/main.json` to update:

- Name, role, title
- Skills (tech skills, soft skills, languages)
- Navigation links (contact, GitHub, website)
- Open source projects

### Adding/Editing Jobs

1. Create or edit a markdown file in `_jobs/` directory
2. Use numbered prefix for ordering (e.g., `11_newjob.md`)
3. Include frontmatter with:

   ```yaml
   ---
   title: Job Title
   company: Company Name
   location: City, Country
   period: 2020 - 2023
   tech:
     - Technology 1
     - Technology 2
   ---
   ```

4. Write job description in markdown below the frontmatter

### Styling

- Main styles: `bundle.css`
- Framework: Pico CSS (loaded via CDN)
- Print styles: Included in `bundle.css` for PDF generation

## Technologies Used

- **Eleventy (11ty)**: Static site generator
- **Nunjucks**: Template engine
- **Pico CSS**: Minimal CSS framework
- **PDFKit**: PDF generation library
- **Font Awesome**: Icon library
- **html-minifier-terser**: HTML minification

## License

ISC
