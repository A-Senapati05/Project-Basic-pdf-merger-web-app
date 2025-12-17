// Import the default export from the pdf-merger-js package
const PDFMerger = require('pdf-merger-js').default;

// Asynchronous function to merge two PDF files
const mergePdfs = async (pdf1, pdf2) => {

    // Create a new PDFMerger instance
    const merger = new PDFMerger();
    
    // Add the first PDF file to the merger
    await merger.add(pdf1);
    // Add the second PDF file to the merger
    await merger.add(pdf2);

    // Generate a unique timestamp for the output filename
    const timestamp = Date.now();
    // Save the merged PDF to the public directory with a unique name
    await merger.save(`public/merged-${timestamp}.pdf`);
    // Return the timestamp (used to reference the merged file)
    return timestamp;
};

// Export the mergePdfs function for use in other modules
module.exports = { mergePdfs };