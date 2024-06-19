const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');
const { Airport } = require('./Airport');

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
        msg: 'Flight number is required',
      },
      notEmpty: {
        msg: 'Flight number cannot be empty',
      },
    },
  },
  departureDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Departure datetime is required',
      },
    },
  },
  arrivalDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Arrival datetime is required',
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
        msg: 'Duration in minutes is required',
      },
      min: {
        args: [1],
        msg: 'Duration must be greater than 0',
      },
    },
  },
  baggageAllowance: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Baggage allowance is required',
      },
      notEmpty: {
        msg: 'Baggage allowance cannot be empty',
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
        msg: 'Origin airport ID is required',
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
        msg: 'Destination airport ID is required',
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

Flight.belongsTo(Airport, { as: 'origin', foreignKey: 'originId' });
Flight.belongsTo(Airport, { as: 'destination', foreignKey: 'destinationId' });

Flight.setOriginAndDestination = function (flight, originId, destinationId) {
  flight.originId = originId;
  flight.destinationId = destinationId;
};

module.exports = { Flight };
