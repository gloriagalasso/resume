const puppeteer = require('puppeteer');

(async () => {
    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Load the HTML file from the local HTTP server
        const url = 'http://127.0.0.1:8080/html/cv-merge.html';
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Define the path to the output PDF
        const pdfFilePath = 'cv.pdf';

        // Generate the PDF
        await page.pdf({
            path: pdfFilePath,
            format: 'A3',
            printBackground: true,
            margin: {
                top: '15mm',
                bottom: '15mm',
            }
        });

        console.log(`PDF generated successfully at: ${pdfFilePath}`);

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
})();