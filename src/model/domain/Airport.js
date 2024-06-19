const Sequelize = require('sequelize');
const sequelize = require('../../configuration/database');

const Airport = sequelize.define('Airport', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Airport name is required',
      },
      notEmpty: {
        msg: 'Validation: Airport name cannot be empty',
      },
    },
  },
  iata: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: IATA code is required',
      },
      notEmpty: {
        msg: 'Validation: IATA code cannot be empty',
      },
    },
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Latitude is required',
      },
      min: {
        args: [-90],
        msg: 'Validation: Latitude must be at least -90',
      },
      max: {
        args: [90],
        msg: 'Validation: Latitude must be at most 90',
      },
    },
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Longitude is required',
      },
      min: {
        args: [-180],
        msg: 'Validation: Longitude must be at least -180',
      },
      max: {
        args: [180],
        msg: 'Validation: Longitude must be at most 180',
      },
    },
  },
  elevation: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Elevation is required',
      },
    },
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Continent is required',
      },
      notEmpty: {
        msg: 'Validation: Continent cannot be empty',
      },
    },
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Country is required',
      },
      notEmpty: {
        msg: 'Validation: Country cannot be empty',
      },
    },
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Region is required',
      },
      notEmpty: {
        msg: 'Validation: Region cannot be empty',
      },
    },
  },
  municipality: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Validation: Municipality is required',
      },
      notEmpty: {
        msg: 'Validation: Municipality cannot be empty',
      },
    },
  },
}, {
  timestamps: false,
});

module.exports = { Airport };
