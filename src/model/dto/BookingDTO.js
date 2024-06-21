const { PassengerDTO } = require("./PassengerDTO");

class BookingDTO {
    constructor(flightNumber, flightClass, email, passengers) {
        this.flightNumber = flightNumber;
        this.flightClass = flightClass;
        this.email = email;
        this.passengers = passengers.map(passenger => new PassengerDTO(
            passenger.firstName,
            passenger.lastName,
            passenger.dateOfBirth,
            passenger.passportNumber
        ));
    }
}

module.exports = { BookingDTO };