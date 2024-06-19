const TicketPricing = require('../domain/TicketPricing');

function fromDTO(flightDTO) {
    return new TicketPricing(
        flightDTO.economyTicketsCount,
        flightDTO.economyPrice,
        flightDTO.businessTicketsCount,
        flightDTO.businessPrice,
        flightDTO.firstTicketsCount,
        flightDTO.firstPrice
    );
}

module.exports = { fromDTO };
