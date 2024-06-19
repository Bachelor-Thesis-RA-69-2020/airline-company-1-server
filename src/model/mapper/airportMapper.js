const AirportDTO = require('../dto/AirportDTO');

function toDTO(airport) {
  return new AirportDTO(
    airport.id,
    airport.name,
    airport.iata,
    airport.latitude,
    airport.longitude,
    airport.elevation,
    airport.continent,
    airport.country,
    airport.region,
    airport.municipality
  );
}

function toDTOList(airports) {
  return airports.map(airport => toDTO(airport));
}

module.exports = {
  toDTOList
};;