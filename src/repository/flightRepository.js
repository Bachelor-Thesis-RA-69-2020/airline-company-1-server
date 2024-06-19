const { Op } = require('sequelize');
const { Flight } = require('../model/domain/Flight');

async function findAll() {
  return await Flight.findAll({
    include: [
        {
          model: Airport,
          as: 'origin'
        },
        {
          model: Airport,
          as: 'destination'
        },
        {
          model: Ticket
        }
      ]
  });
}

async function create(flight, options = {}) {
  return await flight.save({ options });
}

module.exports = {
    findAll,
    create
};
