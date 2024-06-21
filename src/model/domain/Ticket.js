const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');
const { Flight } = require('./Flight');
const { FlightClass } = require('./enum/FlightClass');
const { Booking } = require('./Booking');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Ticket code is required',
      },
      notEmpty: {
        msg: 'Validation: Ticket code cannot be empty',
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Ticket price is required',
      },
      min: {
        args: [0],
        msg: 'Validation: Ticket price must be greater than or equal to 0',
      },
    },
  },
  type: {
    type: Sequelize.ENUM(Object.values(FlightClass)),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Ticket type is required',
      },
    },
  },
  isBought: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  flightId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Flight,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: 'Validation: Flight ID is required',
      },
    },
  },
  bookingId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Booking,
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

Ticket.prototype.buy = function (bookingId) {
  this.isBought = true;
  this.bookingId = bookingId;
};

module.exports = { Ticket };
