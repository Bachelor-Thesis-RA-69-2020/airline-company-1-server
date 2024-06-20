const { Flight } = require('../domain/Flight');
const hasher = require('../../utility/hasher');
const FlightDTO = require('../dto/FlightDTO');

function fromDTO(flightDTO) {
  return Flight.build({
    flightNumber: generateFlightNumber(flightDTO.departureDatetime, flightDTO.arrivalDatetime, flightDTO.originId, flightDTO.destinationId),
    departureDatetime: flightDTO.departureDatetime,
    arrivalDatetime: flightDTO.arrivalDatetime,
    durationMinutes: calculateDuration(flightDTO.departureDatetime, flightDTO.arrivalDatetime),
    baggageAllowance: flightDTO.baggageAllowance,
    childrenDiscount: flightDTO.childrenDiscount
  });
}

function toDTO(flight) {
  return new FlightDTO(
    flight.flightNumber,
    flight.origin.iata + " - " + flight.origin.name,
    flight.destination.iata + " - " + flight.destination.name,
    flight.departureDatetime,
    flight.arrivalDatetime,
    flight.durationMinutes,
    flight.baggageAllowance,
    flight.countAvailableTickets('Economy'),
    flight.findPriceByClass('Economy'),
    flight.countAvailableTickets('Business'),
    flight.findPriceByClass('Business'),
    flight.countAvailableTickets('First'),
    flight.findPriceByClass('First'),
    flight.findDiscount(),
    flight.childrenDiscount
  );
}

function toDTOList(flights) {
  return flights.map(flight => toDTO(flight));
}

function generateFlightNumber(departureDatetime, arrivalDatetime, originId, destinationId) {
  const id = `${departureDatetime}${arrivalDatetime}${originId}${destinationId}`;
  const hash = hasher.hash(id);

  const flightNumber = 'AL1-' + hash.substring(0, 10).toUpperCase();
  
  return flightNumber;
}

function calculateDuration(departureDatetime, arrivalDatetime) {
  const diffMs = new Date(arrivalDatetime) - new Date(departureDatetime);
  return Math.floor(diffMs / (1000 * 60));
}

module.exports = {
  fromDTO,
  toDTO,
  toDTOList
};
