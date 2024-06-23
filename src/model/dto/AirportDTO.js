class AirportDTO {
    constructor(name, iata, latitude, longitude, elevation, continent, country, region, municipality) {
        this.name = name;
        this.iata = iata;
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.continent = continent;
        this.country = country;
        this.region = region;
        this.municipality = municipality;
    }
  }
  
  module.exports = AirportDTO;  