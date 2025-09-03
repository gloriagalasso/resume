const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

(async () => {
  let serverProcess;
  try {
    // Start HTTP server
    console.log("Starting HTTP server...");
    serverProcess = spawn("http-server", [".", "-p", "8080"], {
      cwd: __dirname,
      stdio: "pipe",
    });

    // Wait for server to start
    await new Promise((resolve) => {
      setTimeout(resolve, 3000); // Wait 3 seconds for server to start
    });
    console.log("HTTP server started on port 8080");

    // Launch Puppeteer
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Browser launched successfully");

    // Load the HTML file from the local HTTP server
    const url = "http://127.0.0.1:8080/html/cv-merge.html";
    console.log(`Loading URL: ${url}`);
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log("Page loaded successfully");

    // Define the paths for output files
    const pdfFilePath = "cv.pdf";
    const htmlFilePath = "index.html";

    // Generate the PDF
    console.log("Generating PDF...");
    await page.pdf({
      path: pdfFilePath,
      format: "A3",
      printBackground: true,
      margin: {
        top: "15mm",
        bottom: "15mm",
      },
    });
    console.log(`PDF generated successfully at: ${pdfFilePath}`);

    // Generate standalone HTML file
    console.log("Generating standalone HTML...");

    // Read the job.json data
    const jobData = await fs.readFile(path.join(__dirname, "job.json"), "utf8");

    // Get the full HTML content from the page
    const htmlContent = await page.content();

    // Create a standalone HTML by embedding the JSON data
    const standaloneHtml = htmlContent.replace(/fetch\('\.\.\/job\.json'\)/g, `Promise.resolve({ json: () => ${jobData} })`);

    // Write the standalone HTML file
    await fs.writeFile(htmlFilePath, standaloneHtml);
    console.log(`Standalone HTML generated successfully at: ${htmlFilePath}`);

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
