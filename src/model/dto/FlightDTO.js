class FlightDTO {
    constructor(
        flightNumber,
        origin,
        destination,
        departureDatetime,
        arrivalDatetime,
        durationMinutes,
        baggageAllowance,
        economyTicketsCount,
        economyPrice,
        businessTicketsCount,
        businessPrice,
        firstTicketsCount,
        firstPrice,
        discount,
        childrenDiscount
    ) {
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureDatetime = departureDatetime;
        this.arrivalDatetime = arrivalDatetime;
        this.durationMinutes = durationMinutes;
        this.baggageAllowance = baggageAllowance;
        if (economyTicketsCount !== 0) {
            this.economyTicketsCount = economyTicketsCount;
        }
        if (economyPrice !== -100) {
            this.economyPrice = economyPrice;
        }
        if (businessTicketsCount !== 0) {
            this.businessTicketsCount = businessTicketsCount;
        }
        if (businessPrice !== -100) {
            this.businessPrice = businessPrice;
        }
        if (firstTicketsCount !== 0) {
            this.firstTicketsCount = firstTicketsCount;
        }
        if (firstPrice !== -100) {
            this.firstPrice = firstPrice;
        }
        this.discount = discount;
        this.childrenDiscount = childrenDiscount;
    }
  }
  
  module.exports = FlightDTO;
  