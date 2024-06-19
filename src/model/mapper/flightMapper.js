const crypto = require('crypto');
const { Flight } = require('../domain/Flight');
const hasher = require('../../utility/hasher');

function fromDTO(flightDTO, originAirport, destinationAirport) {
  return Flight.build({
    flightNumber: generateFlightNumber(flightDTO.departureDatetime, flightDTO.arrivalDatetime, flightDTO.originId, flightDTO.destinationId),
    departureDatetime: flightDTO.departureDatetime,
    arrivalDatetime: flightDTO.arrivalDatetime,
    durationMinutes: calculateDuration(flightDTO.departureDatetime, flightDTO.arrivalDatetime),
    baggageAllowance: flightDTO.baggageAllowance,
    childrenDiscount: flightDTO.childrenDiscount,
    originId: originAirport.id,
    destinationId: destinationAirport.id
  });
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
  fromDTO
};
