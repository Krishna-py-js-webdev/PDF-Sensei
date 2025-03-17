const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { extractTextFromPDF } = require("./pdfextract");
const { text } = require("stream/consumers");
const app = express();
app.use(cors()); // Allows frontend to access backend
app.use(fileUpload()); 
app.use(express.json());
// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));



// API route to upload PDF files
app.get("/", (req, res) => {
  res.send("Server is running...");
});

let extractedPdfText = ""
app.post("/uploads", (req, res) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).send("No PDF file uploaded");
  }
 
  const pdf = req.files.pdf;
  const fileName = `${pdf.name}`;
  const filePath = path.join(uploadDir, fileName);

  pdf.mv(filePath, async(err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }
    const pdfPath = path.join(__dirname, "uploads", `${fileName}`);
    // extractTextFromPDF(pdfPath).then(text=>console.log(text));
    const text = await extractTextFromPDF(pdfPath);
    extractedPdfText = text; // Store the text
    console.log("Extracted text stored in memory");
    const pdfDetails = res.json({
      name: pdf.name,
      url: `/uploads/${fileName}`,
      size: pdf.size,
      uploadedAt: new Date().toISOString()
    });
    
  });
});

// API route to get list of uploaded files
app.get("/files", (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir)
      .filter(file => path.extname(file).toLowerCase() === ".pdf")
      .map(file => ({
        name: file,
        url: `/uploads/${file}`,
        uploadedAt: fs.statSync(path.join(uploadDir, file)).mtime.toISOString()
      }));

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Error fetching files" });
  }
});

// const generateFlowchart = async(message) =>{
//     const { generateResponse } = await import("./aiapires.mjs"); // Dynamic import
//     const flowchartCode = await generateResponse(message + "generate a graph TD code, suitable for mermaid js, make it colorful");
//     console.log(flowchartCode)
// }

app.post("/chat", async (req, res) => {
  try {
    console.log("Received chat request:", req.body);
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }
    // if(userMessage.includes = "flowchart" || "flow chart"){
    //   generateFlowchart(userMessage)
      
    // }
    const { generateResponse } = await import("./aiapires.mjs"); // Dynamic import
    const aiResponse = await generateResponse(userMessage + extractedPdfText);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


// Start the backend server
const PORT =  5000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));