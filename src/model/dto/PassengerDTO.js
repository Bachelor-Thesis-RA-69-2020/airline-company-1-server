class PassengerDTO {
    constructor(firstName, lastName, dateOfBirth, passportNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.passportNumber = passportNumber;
    }
}

module.exports = { PassengerDTO };
