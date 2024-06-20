const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');
const { Flight } = require('./Flight');

const Discount = sequelize.define('Discount', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  flightId: {
    type: Sequelize.INTEGER,
    references: {
      model: Flight,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Flight ID is required',
      },
    },
  },
  validFrom: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Validation: Valid From must be a valid date',
      },
      isAfter: {
        args: new Date().toISOString(),
        msg: 'Validation: Valid From must be in the future',
      },
      notNull: {
        msg: 'Validation: Valid From is required',
      },
    },
  },
  validTo: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Validation: Valid To must be a valid date',
      },
      isAfter: {
        args: new Date().toISOString(),
        msg: 'Validation: Valid To must be after Valid From',
      },
      notNull: {
        msg: 'Validation: Valid To is required',
      },
    },
  },
  percentage: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Validation: Percentage must be at least 0',
      },
      max: {
        args: [100],
        msg: 'Validation: Percentage must be at most 100',
      },
      notNull: {
        msg: 'Validation: Percentage is required',
      },
    },
  },
}, {
  timestamps: false,
});

Discount.prototype.setFlight = function (flightId) {
  this.flightId = flightId;
};

Discount.prototype.isActive = function () {
  const currentDate = new Date();
  const isActive = this.validFrom <= currentDate && this.validTo >= currentDate
  return isActive;
};

module.exports = { Discount };
