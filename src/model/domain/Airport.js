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
  },
  iata: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  elevation: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  municipality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = { Airport };
