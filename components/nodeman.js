import fs from "fs";
import PdfParse from "pdf-parse";

export async function extractTextFromPDF(pdfPath) {
    // try {
    //     const dataBuffer = fs.readFileSync(pdfPath); // Read the file as a buffer
    //     const data = await PdfParse(dataBuffer); // Extract text from PDF
    //     return data.text.replace(/\s+/g, ' ').trim(); // Return text as a single string
    // } catch (error) {
    //     console.error("Error reading PDF:", error);
    //     return null;
    // }
    try {
        if (!fs.existsSync(pdfPath)) {
            console.error(" File not found:", pdfPath);
            return null;
        }
        const dataBuffer = fs.readFileSync(pdfPath); // Read the file as a buffer
        const data = await PdfParse(dataBuffer); // Extract text from PDF
        return data.text.replace(/\s+/g, ' ').trim(); // Return text as a single string
    } catch (error) {
        console.error(" Error reading PDF:", error);
        return null;
}
}

extractTextFromPDF(sample.pdf)