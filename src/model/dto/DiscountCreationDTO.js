class DiscountCreationDTO {
    constructor(
      flightNumber,
      validFrom,
      validTo,
      percentage
    ) {
      this.flightNumber = flightNumber;
      this.validFrom = validFrom;
      this.validTo = validTo;
      this.percentage = percentage;
    }
  }
  
  module.exports = DiscountCreationDTO;
  