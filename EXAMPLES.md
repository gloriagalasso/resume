# Quick Start Examples

## 1. Generate CV PDF

```bash
npm run generate:pdf
```

→ Creates: `cv.pdf`

## 2. Generate Cover Letter (Interactive)

```bash
npm run generate:letter
```

→ Prompts for company and position → Creates: `letter.html` + `presentation-letter.pdf`

## 3. Generate Cover Letter (Direct)

```bash
# Google Software Engineer
npm run generate:letter -- --company="Google" --position="Software Engineer"

# Microsoft AI Researcher
npm run generate:letter -- --company="Microsoft" --position="AI Researcher"

# OpenAI Machine Learning Engineer
npm run generate:letter -- --company="OpenAI" --position="Machine Learning Engineer"
```

## 4. Start Development Server

```bash
npm run dev
```

→ Opens browser at http://localhost:8080

## 5. Customize Letter Content

Edit `presentation-letter.txt`:

- Use `[job-company]` for company name
- Use `[job-position]` for job title
- Write in plain text with line breaks

## 6. Update CV Data

Edit `job.json`:

- Update personal information in `summary`
- Add work experience in `work_experience`
- Modify skills in `technical_skills`
- Change font via `font.family` and `font.googleFontsUrl`

## Generated Files

- `cv.pdf` - Your CV as PDF
- `letter.html` - Cover letter as webpage
- `presentation-letter.pdf` - Cover letter as PDF

## Tips

- Always run commands from the project root directory
- Keep placeholder format exactly as `[job-company]` and `[job-position]`
- Test letter template by generating with sample data first
- Use the development server to preview changes before generating PDFs
