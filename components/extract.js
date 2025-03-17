const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();
app.use(fileUpload());

app.post("/extract-text", async (req, res) => {
    if (!req.files || !req.files.pdf) {
        return res.status(400).send("No PDF file uploaded");
    }

    try {
        const pdfBuffer = req.files.pdf.data;
        const data = await pdfParse(pdfBuffer);
        res.json({ text: data.text });
    } catch (error) {
        res.status(500).json({ error: "Error extracting text" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
