const sequelize = require('../configuration/database');
const flightMapper = require('../model/mapper/flightMapper');
const ticketPricingMapper = require('../model/mapper/ticketPricingMapper');
const flightRepository = require('../repository/flightRepository');
const airportService = require('../service/airportService');
const ticketService = require('../service/ticketService');
const dateValidator = require('../utility/dateValidator');
const { Flight } = require('../model/domain/Flight');

async function create(flightInformation) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const originAirport = await airportService.checkIfExists(flightInformation.originIATA);
        const destinationAirport = await airportService.checkIfExists(flightInformation.destinationIATA);

        let flight = flightMapper.fromDTO(flightInformation);
        Flight.setOriginAndDestination(flightMapper, originAirport.id, destinationAirport.id);

        dateValidator.isFutureDate(flight.departureDatetime, true);

        flight = await flightRepository.create(flight, { transaction });
        
        const ticketPricing = ticketPricingMapper.fromDTO(flightInformation);
        await ticketService.createAllTickets(flight.id, ticketPricing, transaction);

        await transaction.commit();
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

async function findByFlightNumber(flightNumber) {
    const flight = await flightRepository.findByFlightNumber(flightNumber);

    if (!flight) {
        throw new Error(`Flight with flight number ${flightNumber} does not exist.`);
    }

    return flight;
}

module.exports = {
    create,
    findByFlightNumber
};
