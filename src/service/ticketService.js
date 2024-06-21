const ticketRepository = require('../repository/ticketRepository');
const flightRepository = require('../repository/flightRepository');
const hasher = require('../utility/hasher');
const { Ticket } = require('../model/domain/Ticket');

async function createAllTickets(flightId, pricing, transaction) {
    await createClassTickets(flightId, 'Economy', pricing.economyCount, pricing.economyPrice, transaction);
    await createClassTickets(flightId, 'Business', pricing.businessCount, pricing.businessPrice, transaction);
    await createClassTickets(flightId, 'First', pricing.firstCount, pricing.firstPrice, transaction);
}

async function createClassTickets(flightId, flightClass, count, price, transaction) {
    for (let serialNumber = 1; serialNumber <= count; serialNumber++) {
      const ticket = Ticket.build({
        code: generateTicketCode(flightId, flightClass, serialNumber),
        price: price,
        type: flightClass,
        isBought: false,
        flightId: flightId
      });
      await ticketRepository.create(ticket, { transaction });
    }
}

function generateTicketCode(flightId, flightClass, serialNumber) {
    const id = `${flightId}${flightClass}${serialNumber}`;
    const hash = hasher.hash(id);

    const code = `AL1-${flightClass}-${hash.substring(0, 10).toUpperCase()}`;
    
    return code;
}

async function buy(flightNumber, flightClass, bookingId, transaction) {
  const flight = await findByFlightNumber(flightNumber);
  
  const ticket = flight.findAvailableTicket(flightClass);

  if (!ticket) {
    throw new Error(`No available ${flightClass} class ticket found for flight with flight number ${flightNumber}.`);
  }

  ticket.buy(bookingId);

  await ticketRepository.update(ticket, { transaction });
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

module.exports = {
    createAllTickets,
    buy
};
