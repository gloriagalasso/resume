# 📄 Gloria Galasso - Dynamic CV & Cover Letter Generator

A modern, responsive CV and automated cover letter generation system built with Vue.js, Tailwind CSS, TypeScript, and Puppeteer.

## ✨ Features

### 🎯 **Dynamic CV System**

- **JSON-Driven Content**: All CV data stored in `job.json` for easy updates
- **Responsive Design**: Beautiful layout that works on all devices
- **Modern Styling**: Clean, professional design with Tailwind CSS
- **Interactive Elements**: Hover effects, social media links, and smooth animations
- **Font Customization**: Easy font switching via configuration
- **PDF Generation**: Generate professional PDF versions

### 📝 **Automated Cover Letter System**

- **Template-Based**: Customizable letter template in `presentation-letter.txt`
- **Dynamic Placeholders**: Auto-replace company and position information
- **Professional HTML Layout**: Clean, business-appropriate design
- **PDF Export**: Generate PDF cover letters automatically
- **Command Line Interface**: Quick generation with company/position parameters

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone or download the project
cd resume

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Available Commands

### CV Management

```bash
# Start development server (opens browser automatically)
npm run dev

# Start server only
npm start

# Generate PDF of CV
npm run generate:pdf
```

### Cover Letter Generation

```bash
# Interactive mode - prompts for company and position
npm run generate:letter

# Direct mode - specify company and position
npm run generate:letter -- --company="Google" --position="Software Engineer"

# Alternative syntax
npx ts-node generate-letter.ts --company="Microsoft" --position="ML Engineer"
```

## 🔧 Configuration

### CV Data (`job.json`)

Update your CV information by editing `job.json`:

```json
{
    "font": {
        "family": "Lato",
        "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
    },
    "summary": {
        "name": "Your Name",
        "email": "your.email@example.com",
        "phone": "+1234567890"
    },
    "education": [...],
    "technical_skills": {...},
    "work_experience": [...],
    "awards": [...],
    "leadership": [...]
}
```

### Cover Letter Template (`presentation-letter.txt`)

Customize your cover letter by editing `presentation-letter.txt`. Use these placeholders:

- `[job-company]` - Will be replaced with the company name
- `[job-position]` - Will be replaced with the job position

## 📁 File Structure

```
resume/
├── 📄 index.html              # Main CV page
├── 📄 presentation.html       # Cover letter template (auto-generated)
├── 📄 letter.html            # Generated cover letter (auto-generated)
├── 📊 job.json               # CV data configuration
├── 📝 presentation-letter.txt # Cover letter template
├── 🔧 generate-pdf.js        # CV PDF generator
├── 🔧 generate-letter.ts     # Cover letter generator
├── 📦 package.json           # Dependencies & scripts
├── 🖼️  images/               # Profile images and assets
├── 📄 cv.pdf                 # Generated CV PDF
├── 📄 presentation-letter.pdf # Generated cover letter PDF
└── 📖 README.md              # This file
```

## 🎨 Customization

### Changing Fonts

Update the font in `job.json`:

```json
{
  "font": {
    "family": "Roboto",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  }
}
```

### Adding New Sections

1. Add data to `job.json`
2. Update `index.html` template with Vue.js syntax
3. Style with Tailwind CSS classes

### Customizing Cover Letter

1. Edit `presentation-letter.txt` for content
2. Modify `presentation.html` for layout/styling
3. Use `[job-company]` and `[job-position]` placeholders

## 🛠️ Technical Stack

- **Frontend**: HTML5, Vue.js 3, Tailwind CSS
- **Icons**: Font Awesome 6
- **PDF Generation**: Puppeteer
- **Build Tools**: TypeScript, ts-node
- **Development**: http-server

## 📖 Usage Examples

### Generate Cover Letter for Specific Job

```bash
# For a Software Engineer position at Google
npm run generate:letter -- --company="Google" --position="Software Engineer"

# For a Data Scientist role at Microsoft
npm run generate:letter -- --company="Microsoft" --position="Data Scientist"
```

### Update CV Information

1. Edit `job.json` with your information
2. Refresh the browser to see changes
3. Generate PDF: `npm run generate:pdf`

### Deploy to Web

1. Upload all files to your web server
2. Ensure `job.json` and `images/` are accessible
3. The CV will load dynamically

## 🚨 Troubleshooting

### Common Issues

**PDF Generation Fails**

- Ensure Puppeteer is installed: `npm install puppeteer`
- Check that http-server is available: `npm install -g http-server`

**Cover Letter Not Generating**

- Verify `presentation-letter.txt` exists
- Check TypeScript compilation: `npx tsc --noEmit`

**Fonts Not Loading**

- Verify Google Fonts URL in `job.json`
- Check internet connection for CDN resources

**Images Not Displaying**

- Ensure image files exist in `images/` directory
- Check file paths in HTML/JSON

## 📄 Output Files

After running the generators, you'll get:

### CV Generation

- `cv.pdf` - Professional PDF version of your CV

### Cover Letter Generation

- `letter.html` - Formatted HTML cover letter
- `presentation-letter.pdf` - PDF version for sending

## 🔄 Development Workflow

1. **Update CV**: Edit `job.json` → Refresh browser → Generate PDF
2. **Create Cover Letter**: Run `npm run generate:letter` → Specify company/position → Get HTML + PDF
3. **Customize**: Modify templates → Test → Deploy

## 📞 Support

For issues or questions:

1. Check this README
2. Verify all dependencies are installed
3. Ensure Node.js version is 16+

---

Built with ❤️ by Gloria Galasso | Automated CV & Cover Letter System
