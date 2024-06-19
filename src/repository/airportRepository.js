const { Op } = require('sequelize');
const { Airport } = require('../model/domain/Airport');

async function findAll() {
  return await Airport.findAll();
}

async function findAllBySearch(search) {
  return await Airport.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { iata: { [Op.iLike]: `%${search}%` } },
      ]
    }
  });
}

async function findByIATA(iata) {
  return await Airport.findOne({
    where: {
      iata: {
        [Op.iLike]: iata
      }
    }
  });
}

module.exports = {
    findAll,
    findAllBySearch,
    findByIATA
};
