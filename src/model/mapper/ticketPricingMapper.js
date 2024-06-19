const TicketPricing = require('../domain/TicketPricing');
const FlightCreationDTO = require('../dto/FlightCreationDTO');

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
