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
      firstPrice,
      childrenDiscount
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
      this.childrenDiscount = childrenDiscount;
    }
  }
  
  module.exports = FlightCreationDTO;
  