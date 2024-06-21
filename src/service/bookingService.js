const sequelize = require('../configuration/database');
const bookingMapper = require('../model/mapper/bookingMapper');
const bookingRepository = require('../repository/bookingRepository');
const flightService = require('../service/flightService');
const ticketService = require('../service/ticketService');
const emailSender = require('../utility/emailSender');
const PDFGenerator = require('../utility/PDFGenerator');

async function bookAll(bookings) {
    const flight = await flightService.findByFlightNumber(bookings.flightNumber);

    const validFlightClasses = ['Economy', 'Business', 'First'];
    if (!bookings.flightClass || !validFlightClasses.includes(bookings.flightClass)) {
        throw new Error('Validation: Invalid flight class. Must be one of: Economy, Business, First.');
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();

        const ticketCodes = []
        for (const passenger of bookings.passengers) {
            const ticketCode = await bookOne(bookings.flightNumber, bookings.flightClass, bookings.email, passenger, transaction);
            ticketCodes.push(ticketCode)
        }
        await transaction.commit();
        generatePdfAndSendEmail(bookings.email, flight, bookings.flightClass, bookings.passengers, ticketCodes);
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

async function bookOne(flightNumber, flightClass, email, passenger, transaction) {
    let booking = bookingMapper.fromDTO(passenger);
    booking.setEmail(email);

    booking = await bookingRepository.create(booking, { transaction });

    const ticketCode = await ticketService.buy(flightNumber, flightClass, booking.id, transaction);
    return ticketCode;
}

async function generatePdfAndSendEmail(email, flight, flightClass, passengers, ticketCodes) {
    try {
        const pdfBuffer = await PDFGenerator.generateTicketsPDF(flight, flightClass, passengers, ticketCodes);
        
        await emailSender.sendTicketsEmail(email, pdfBuffer);
        
        console.log('Email with PDF attachment sent successfully.');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    bookAll
};
