const sequelize = require('../configuration/database');
const bookingMapper = require('../model/mapper/bookingMapper');
const bookingRepository = require('../repository/bookingRepository');
const flightService = require('../service/flightService');
const ticketService = require('../service/ticketService');
const emailSender = require('../utility/emailSender');
const PDFGenerator = require('../utility/PDFGenerator');

async function bookAll(bookings) {
    await flightService.findByFlightNumber(bookings.flightNumber);

    const validFlightClasses = ['Economy', 'Business', 'First'];
    if (!bookings.flightClass || !validFlightClasses.includes(bookings.flightClass)) {
        throw new Error('Validation: Invalid flight class. Must be one of: Economy, Business, First.');
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();

        for (const passenger of bookings.passengers) {
            await bookOne(bookings.flightNumber, bookings.flightClass, bookings.email, passenger, transaction);
        }
        await transaction.commit();
        generatePdfAndSendEmail();
    } catch (error) {
        console.log("alo\nalo\nalo\nalo")
        if (transaction) await transaction.rollback();
        throw error;
    }
}

async function bookOne(flightNumber, flightClass, email, passenger, transaction) {
    console.log('ok1')
    let booking = bookingMapper.fromDTO(passenger);
    booking.setEmail(email);

    booking = await bookingRepository.create(booking, { transaction });

    await ticketService.buy(flightNumber, flightClass, booking.id, transaction);
}

async function generatePdfAndSendEmail() {
    try {
        // Generate PDF from template
        const pdfBuffer = await PDFGenerator.generateTicketsPDF();
        
        // Send email with PDF attachment
        await emailSender.sendTicketsEmail("nikolicmarko1243@gmail.com", pdfBuffer);
        
        console.log('Email with PDF attachment sent successfully.');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    bookAll
};
