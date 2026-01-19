const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

(async () => {
  let serverProcess;
  try {
    // Get HTML file from command line arguments or default to index.html
    const args = process.argv.slice(2);
    let htmlFile = "index.html";

    // Parse command line arguments
    args.forEach((arg) => {
      if (arg.startsWith("--file=")) {
        htmlFile = arg.replace("--file=", "");
      } else if (arg.endsWith(".html")) {
        htmlFile = arg;
      }
    });

    // Validate HTML file exists
    const htmlPath = path.resolve(__dirname, htmlFile);
    try {
      await fs.access(htmlPath);
    } catch (error) {
      console.error(`❌ HTML file '${htmlFile}' not found!`);
      console.log("Available options: index.html, test.html");
      process.exit(1);
    }

    console.log(`📄 Generating PDF from: ${htmlFile}`);

    // Start HTTP server
    console.log("Starting HTTP server...");
    serverProcess = spawn("http-server", [".", "-p", "8081"], {
      cwd: __dirname,
      stdio: "pipe",
    });

    // Wait for server to start
    await new Promise((resolve) => {
      setTimeout(resolve, 3000); // Wait 3 seconds for server to start
    });
    console.log("HTTP server started on port 8081");

    // Launch Puppeteer
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Browser launched successfully");

    // Load the HTML file from the local HTTP server
    const url = `http://127.0.0.1:8081/${htmlFile}`;
    console.log(`Loading URL: ${url}`);
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log("Page loaded successfully");

    // Define the path for output PDF based on HTML file
    const baseName = path.basename(htmlFile, ".html");
    const pdfFilePath = `cv_${baseName}.pdf`;

    // Generate the PDF
    console.log("Generating PDF...");
    await page.pdf({
      path: pdfFilePath,
      format: "A3",
      printBackground: true,
      margin: {},
    });
    console.log(`✅ PDF generated successfully at: ${pdfFilePath}`);
    console.log(`📄 Source: ${htmlFile}`);
    console.log(`💾 Output: ${pdfFilePath}`);

    // Usage instructions
    if (htmlFile === "index.html") {
      console.log('\n💡 Tip: Use "node generate-pdf.js test.html" to generate from test.html');
    }

    // Close the browser
    await browser.close();

    // Stop the HTTP server
    if (serverProcess) {
      console.log("Stopping HTTP server...");
      serverProcess.kill();
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Make sure to stop the server if there's an error
    if (serverProcess) {
      serverProcess.kill();
    }
  }
})();
