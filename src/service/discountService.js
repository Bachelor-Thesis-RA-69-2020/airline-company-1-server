
const discountRepository = require('../repository/discountRepository');
const discountMapper = require('../model/mapper/discountMapper');
const flightService = require('../service/flightService');
const dateValidator = require('../utility/dateValidator');
const { Discount } = require('../model/domain/Discount');


async function create(discountInformation) {
    const flight = await flightService.findByFlightNumber(discountInformation.flightNumber);

    let discount = discountMapper.fromDTO(discountInformation);
    Discount.setFlight(discount, flight.id);

    dateValidator.isFutureDate(discount.validFrom, true);

    await discountRepository.create(discount);
}

module.exports = {
    create
};
