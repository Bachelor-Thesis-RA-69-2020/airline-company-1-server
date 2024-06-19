const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');
const { Airport } = require('./Airport');
const { Ticket } = require('./Ticket');

const Flight = sequelize.define('Flight', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  flightNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Flight number is required',
      },
      notEmpty: {
        msg: 'Validation: Flight number cannot be empty',
      },
    },
  },
  departureDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Departure datetime is required',
      },
    },
  },
  arrivalDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Arrival datetime is required',
      },
      isAfterDeparture: function(value) {
        if (value <= this.departureDatetime) {
          throw new Error('Arrival datetime must be after departure datetime');
        }
      },
    },
  },
  durationMinutes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Duration in minutes is required',
      },
      min: {
        args: [1],
        msg: 'Validation: Duration must be greater than 0',
      },
    },
  },
  baggageAllowance: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Baggage allowance is required',
      },
      notEmpty: {
        msg: 'Validation: Baggage allowance cannot be empty',
      },
    },
  },
  childrenDiscount: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Children discount is required',
      },
      min: {
        args: [0],
        msg: 'Validation: Children discount must be at least 0',
      },
      max: {
        args: [100],
        msg: 'Validation: Children discount must be at most 100',
      },
    },
  },
  originId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Airport,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: 'Validation: Origin airport ID is required',
      },
    },
  },
  destinationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Airport,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: 'Validation: Destination airport ID is required',
      },
      notEqualOrigin: function(value) {
        if (value === this.originId) {
          throw new Error('Destination airport must be different from origin airport');
        }
      },
    },
  },
}, {
  timestamps: false,
});

Flight.setOriginAndDestination = function (flight, originId, destinationId) {
  flight.originId = originId;
  flight.destinationId = destinationId;
};

module.exports = { Flight };
