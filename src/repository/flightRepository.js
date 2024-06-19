const { Flight } = require('../model/domain/Flight');
const { Airport } = require('../model/domain/Airport');
const { Ticket } = require('../model/domain/Ticket');
const { Discount } = require('../model/domain/Discount');

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
        },
        {
          model: Discount,
          as: 'discounts'
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
      },
      {
        model: Discount,
        as: 'discounts'
      }
    ]
  });
}

module.exports = {
    create,
    findAll,
    findByFlightNumber
};
