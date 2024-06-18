const airportMapper = require('../model/mapper/airportMapper');
const airportRepository = require('../repository/airportRepository');

async function findAll() {
    const airports = await airportRepository.findAll();
    const airportDTOs = airportMapper.toDTOList(airports);
    return airportDTOs;
}

async function search(search) {
    const airports = await airportRepository.findAllBySearch(search);
    const airportDTOs = airportMapper.toDTOList(airports);
    return airportDTOs;
}

module.exports = {
    findAll,
    search,
};
