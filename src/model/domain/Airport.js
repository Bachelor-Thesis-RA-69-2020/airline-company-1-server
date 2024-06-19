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
        msg: 'Airport name is required',
      },
      notEmpty: {
        msg: 'Airport name cannot be empty',
      },
    },
  },
  iata: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'IATA code is required',
      },
      notEmpty: {
        msg: 'IATA code cannot be empty',
      },
    },
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Latitude is required',
      },
      min: {
        args: [-90],
        msg: 'Latitude must be at least -90',
      },
      max: {
        args: [90],
        msg: 'Latitude must be at most 90',
      },
    },
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Longitude is required',
      },
      min: {
        args: [-180],
        msg: 'Longitude must be at least -180',
      },
      max: {
        args: [180],
        msg: 'Longitude must be at most 180',
      },
    },
  },
  elevation: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Elevation is required',
      },
    },
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Continent is required',
      },
      notEmpty: {
        msg: 'Continent cannot be empty',
      },
    },
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Country is required',
      },
      notEmpty: {
        msg: 'Country cannot be empty',
      },
    },
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Region is required',
      },
      notEmpty: {
        msg: 'Region cannot be empty',
      },
    },
  },
  municipality: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Municipality is required',
      },
      notEmpty: {
        msg: 'Municipality cannot be empty',
      },
    },
  },
}, {
  timestamps: false,
});

module.exports = { Airport };
