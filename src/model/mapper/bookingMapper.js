const { Booking } = require('../domain/Booking');

function fromDTO(bookingDTO) {
    return Booking.build({
        firstName: bookingDTO.firstName,
        lastName: bookingDTO.lastName,
        dateOfBirth: bookingDTO.dateOfBirth,
        passportNumber: bookingDTO.passportNumber,
    });
}

module.exports = {
    fromDTO
};