// generate-letter.ts
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    // allow --source=path and --out=filename
    const sourceArg = args.find(a => a.startsWith('--source='));
    const outArg = args.find(a => a.startsWith('--out='));

    const htmlPath = sourceArg ? path.resolve(process.cwd(), sourceArg.replace('--source=', ''))
      : path.resolve(__dirname, 'presentation.html');

    if (!fs.existsSync(htmlPath)) {
      console.error('HTML source not found:', htmlPath);
      process.exit(1);
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    const pdfFilename = outArg ? outArg.replace('--out=', '') : 'presentation-letter.pdf';
    const pdfPath = path.resolve(process.cwd(), pdfFilename);

    console.log('Generating PDF from:', htmlPath);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' } });

    await browser.close();
    console.log(`✅ PDF generated: ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

main();