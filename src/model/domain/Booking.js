const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Email is required',
      },
      isEmail: {
        msg: 'Validation: Invalid email format',
      },
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: First name is required',
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Last name is required',
      },
    },
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Date of birth is required',
      },
      isDate: {
        msg: 'Validation: Invalid date format for date of birth',
      },
    },
  },
  passportNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Passport number is required',
      },
    },
  },
}, {
  timestamps: false,
});

Booking.prototype.setEmail = function (email) {
  this.email = email;
};

module.exports = { Booking };
