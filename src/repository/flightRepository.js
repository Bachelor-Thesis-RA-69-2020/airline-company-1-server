const { Op } = require('sequelize');
const { Flight } = require('../model/domain/Flight');
const { Airport } = require('../model/domain/Airport');
const { Ticket } = require('../model/domain/Ticket');

async function create(flight, options = {}) {
  return await flight.save({ options });
}

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
          model: Ticket,
          as: 'tickets'
        }
      ]
  });
}

async function findByFlightNumber(flightNumber) {
  return await Flight.findOne({
    where: {
      flightNumber: flightNumber
    },
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
        model: Ticket,
        as: 'tickets'
      }
    ]
  });
}

module.exports = {
    create,
    findAll,
    findByFlightNumber
};
