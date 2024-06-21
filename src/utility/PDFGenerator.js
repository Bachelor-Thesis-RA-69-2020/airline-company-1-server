const pdf = require('html-pdf');
const fs = require('fs/promises');

async function generateTicketsPDF() {
    try {
        const templatePath = 'src/static/PDFTemplates/ticketPDFTemplate.html';
        const renderedHtml = await fs.readFile(templatePath, 'utf-8');

        return new Promise((resolve, reject) => {
            pdf.create(renderedHtml, { format: 'A4' }).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

module.exports = {
    generateTicketsPDF
};
