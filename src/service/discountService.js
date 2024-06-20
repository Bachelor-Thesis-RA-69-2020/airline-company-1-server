
const discountRepository = require('../repository/discountRepository');
const discountMapper = require('../model/mapper/discountMapper');
const flightService = require('../service/flightService');
const dateValidator = require('../utility/dateValidator');


async function create(discountInformation) {
    const flight = await flightService.findByFlightNumber(discountInformation.flightNumber);

    let discount = discountMapper.fromDTO(discountInformation);
    discount.setFlight(flight.id);

    dateValidator.isFutureDate(discount.validFrom, true);

    await discountRepository.create(discount);
}

module.exports = {
    create
};
