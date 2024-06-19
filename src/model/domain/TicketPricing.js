class TicketPricing {
    constructor(
        economyCount,
        economyPrice,
        businessCount,
        businessPrice,
        firstCount,
        firstPrice
    ) {
        this.economyCount = economyCount;
        this.economyPrice = economyPrice;
        this.businessCount = businessCount;
        this.businessPrice = businessPrice;
        this.firstCount = firstCount;
        this.firstPrice = firstPrice;
    }
}

module.exports = TicketPricing;
