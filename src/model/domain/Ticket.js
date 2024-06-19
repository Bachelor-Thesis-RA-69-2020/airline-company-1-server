const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');
const { Flight } = require('./Flight');
const { FlightClass } = require('./enum/FlightClass');

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
        msg: 'Ticket code is required',
      },
      notEmpty: {
        msg: 'Ticket code cannot be empty',
      },
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Ticket price is required',
      },
      min: {
        args: [0],
        msg: 'Ticket price must be greater than or equal to 0',
      },
    },
  },
  type: {
    type: Sequelize.ENUM(Object.values(FlightClass)),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Ticket type is required',
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
        msg: 'Flight ID is required',
      },
    },
  },
}, {
  timestamps: false,
});

Ticket.belongsTo(Flight, { foreignKey: 'flightId' });

module.exports = { Ticket };
