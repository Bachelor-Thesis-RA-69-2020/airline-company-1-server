const crypto = require('crypto');
const ticketRepository = require('../repository/ticketRepository');
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
    const hash = crypto.createHash('sha256')
      .update(`${flightId}${flightClass}${serialNumber}`)
      .digest('hex');
  
    const code = `AL1-${flightClass}-${hash.substring(0, 10).toUpperCase()}`;
    
    return code;
  }

module.exports = {
    createAllTickets
};
