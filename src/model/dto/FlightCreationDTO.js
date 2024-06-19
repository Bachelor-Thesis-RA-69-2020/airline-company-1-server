class FlightCreationDTO {
    constructor(
      departureDatetime,
      arrivalDatetime,
      baggageAllowance,
      originIATA,
      destinationIATA,
      economyTicketsCount,
      economyPrice,
      businessTicketsCount,
      businessPrice,
      firstTicketsCount,
      firstPrice
    ) {
      this.departureDatetime = departureDatetime;
      this.arrivalDatetime = arrivalDatetime;
      this.baggageAllowance = baggageAllowance;
      this.originIATA = originIATA;
      this.destinationIATA = destinationIATA;
      this.economyTicketsCount = economyTicketsCount;
      this.economyPrice = economyPrice;
      this.businessTicketsCount = businessTicketsCount;
      this.businessPrice = businessPrice;
      this.firstTicketsCount = firstTicketsCount;
      this.firstPrice = firstPrice;
    }
  }
  
  module.exports = FlightCreationDTO;
  