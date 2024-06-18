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

module.exports = {
    findAll,
  findAllBySearch,
};
