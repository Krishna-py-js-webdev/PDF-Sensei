const fs = require("fs");
const path = require("path")
const PdfParse = require("pdf-parse");
const { text } = require("stream/consumers");
// import PdfParse from "pdf-parse";

async function extractTextFromPDF(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath); // Read the file as a buffer
        const data = await PdfParse(dataBuffer); // Extract text from PDF
        return data.text.replace(/\s+/g, ' ').trim(); // Return text as a single string
    } catch (error) {
        console.error("Error reading PDF:", error);
        return null;
    }
   
}
// const pdfPath = path.join(__dirname, "uploads", "sample.pdf");
// extractTextFromPDF(pdfPath).then(text=>console.log(text));

module.exports.extractTextFromPDF=extractTextFromPDF