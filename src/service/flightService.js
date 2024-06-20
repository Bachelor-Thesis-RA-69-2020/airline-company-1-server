const sequelize = require('../configuration/database');
const flightMapper = require('../model/mapper/flightMapper');
const ticketPricingMapper = require('../model/mapper/ticketPricingMapper');
const flightRepository = require('../repository/flightRepository');
const airportService = require('../service/airportService');
const ticketService = require('../service/ticketService');
const dateValidator = require('../utility/dateValidator');

async function create(flightInformation) {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const originAirport = await airportService.checkIfExists(flightInformation.originIATA);
        const destinationAirport = await airportService.checkIfExists(flightInformation.destinationIATA);

        let flight = flightMapper.fromDTO(flightInformation);
        flight.setOriginAndDestination(originAirport.id, destinationAirport.id);

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

async function findByFlightNumber(flightNumber, mapToDTO = false) {
    const flight = await flightRepository.findByFlightNumber(flightNumber);

    if (!flight) {
        throw new Error(`Flight with flight number ${flightNumber} does not exist.`);
    }

    if(!mapToDTO) {
        return flight;
    }

    const flightDTO = flightMapper.toDTO(flight);
    
    return flightDTO;
}

async function search(from, to, origin, destination, flightClass, passengerCount) {
    let flights = await flightRepository.findAll();
    console.log("1: " + flights.length)
    if (!flights || flights.length === 0) {
        return [];
    }

    console.log("2: " + flights.length)
    flights = await searchByDateRange(flights, from, to);
    console.log("3: " + flights.length)
    flights = await searchByRelation(flights, origin, destination);
    console.log("4: " + flights.length)
    flights = await searchByPassengerInformation(flights, flightClass, passengerCount);
    console.log("5: " + flights.length)

    const flightDTOs = flightMapper.toDTOList(flights);
    
    return flightDTOs;
}

async function searchByDateRange(flights, from, to) {
    if (from && to && from >= to) {
        throw new Error('Validation: From date must be before To date.');
    }
    console.log("11: " + flights.length)

    flights = await searchByFrom(flights, from);
    console.log("12: " + flights.length)
    flights = await searchByTo(flights, to);
    console.log("13: " + flights.length)
    return flights;
}

async function searchByRelation(flights, origin, destination) {
    if (origin && destination && origin === destination) {
        throw new Error('Validation: Origin and destination cannot be the same.');
    }

    if (origin) {
        await airportService.checkIfExists(origin);
    }
    
    if (destination) {
        await airportService.checkIfExists(destination);
    }

    flights = await searchByOrigin(flights, origin);
    flights = await searchByDestination(flights, destination);
    return flights;
}

async function searchByPassengerInformation(flights, flightClass, passengerCount) {
    if (passengerCount && passengerCount < 1) {
        throw new Error('Validation: Passenger count must be 1 or more.');
    }

    const validFlightClasses = ['Economy', 'Business', 'First'];
    if (flightClass && !validFlightClasses.includes(flightClass)) {
        throw new Error('Validation: Invalid flight class. Must be one of: Economy, Business, First.');
    }

    flights = flights.filter(flight => flight.countAvailableTickets(flightClass) >= passengerCount);
    return flights;
}

async function searchByFrom(flights, from) {
    console.log(from)
    console.log(flights[0].departureDatetime)
    if(from) {
        flights = flights.filter(flight => flight.departureDatetime >= from);
    }
    return flights;
}

async function searchByTo(flights, to) {
    if(to) {
        flights = flights.filter(flight => flight.departureDatetime <= to);
    }
    return flights;
}

async function searchByOrigin(flights, origin) {
    if(origin) {
        flights = flights.filter(flight => flight.origin.iata == origin);
    }
    return flights;
}

async function searchByDestination(flights, destination) {
    if(destination) {
        flights = flights.filter(flight => flight.destination.iata == destination);
    }
    return flights;
}

module.exports = {
    create,
    findByFlightNumber,
    search
};
