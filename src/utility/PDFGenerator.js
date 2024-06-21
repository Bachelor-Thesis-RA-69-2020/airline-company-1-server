const pdf = require('html-pdf');
const fs = require('fs/promises');
const moment = require('moment');

async function generateTicketsPDF(flight, flightClass, passengers, ticketCodes) {
    try {
        let pdfBuffer = null;

        const templatePath = 'src/static/PDFTemplates/ticketPDFTemplate.html';
        let templateHtml = await fs.readFile(templatePath, 'utf-8');

        const formattedDeparture = moment(flight.departureDatetime).format('DD.MM.YYYY. HH:mm');
        const formattedArrival = moment(flight.arrivalDatetime).format('DD.MM.YYYY. HH:mm');

        const tickets = [];

        for (let i = 0; i < passengers.length; i++) {
            const passenger = passengers[i];
            const ticketCode = ticketCodes[i];
            const formattedDateOfBirth = moment(passenger.dateOfBirth).format('DD.MM.YYYY.');

            let html = templateHtml.replace('{originIATA}', flight.origin.iata)
                .replace('{destinationIATA}', flight.destination.iata)
                .replace('{origin}', flight.origin.name)
                .replace('{destination}', flight.destination.name)
                .replace('{departure}', formattedDeparture)
                .replace('{arrival}', formattedArrival)
                .replace('{flightNumber}', flight.flightNumber)
                .replace('{flightClass}', flightClass)
                .replace('{ticketCode}', ticketCode)
                .replace('{name}', passenger.firstName + ' ' + passenger.lastName)
                .replace('{dateOfBirth}', formattedDateOfBirth)
                .replace('{passportNumber}', passenger.passportNumber);

            tickets.push(html);
        }

        const allTicketsHtml = tickets.join('<div style="page-break-after:always;"></div>');

        pdfBuffer = await new Promise((resolve, reject) => {
            pdf.create(allTicketsHtml, { format: 'A4' }).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

module.exports = {
    generateTicketsPDF
};
