// Import required modules
const express = require('express')
const { mergePdfs } = require('./merge');
const path = require('path')
const multer = require('multer')

// Initialize Express app
const app = express()
// Configure multer for file uploads (store in 'uploads/' directory)
const upload = multer({ dest: 'uploads/' })
// Define the port number
const port = 3000

// Serve static files from the 'public' directory
app.use(express.static('public')) 

// Route for serving the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Route for handling PDF merge requests
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    try {
        // Get the paths of the uploaded PDF files
        const pdf1 = req.files[0].path;
        const pdf2 = req.files[1].path;

        // Merge the PDFs and get the timestamp for the output file
        const timestamp = await mergePdfs(pdf1, pdf2);

        // Redirect user to the merged PDF file
        res.redirect(`/merged-${timestamp}.pdf`); 
    } catch (err) {
        // Handle errors during merging
        console.error('Error merging PDFs:', err);
        res.status(500).send('Error merging PDFs');
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})