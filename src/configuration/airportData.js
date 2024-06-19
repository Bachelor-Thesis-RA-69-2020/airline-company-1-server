require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('./database');
const { Airport } = require('../model/domain/Airport');

async function migrateAirports() {
  const count = await Airport.count();
  if (count > 0) {
    console.log('Airport table is not empty, skipping migration.');
    return;
  }

  const airports = [];

  fs.createReadStream(path.resolve(__dirname, process.env.AIRPORT_CSV_PATH))
    .pipe(csv())
    .on('data', (row) => {
      if (row.type === 'large_airport') {
        if (
          row.name &&
          row.iata_code &&
          row.latitude_deg &&
          row.longitude_deg &&
          row.elevation_ft &&
          row.continent &&
          row.iso_country &&
          row.iso_region &&
          row.municipality
        ) {
          airports.push({
            name: row.name,
            iata: row.iata_code,
            latitude: parseFloat(row.latitude_deg),
            longitude: parseFloat(row.longitude_deg),
            elevation: parseFloat(row.elevation_ft),
            continent: row.continent,
            country: row.iso_country,
            region: row.iso_region,
            municipality: row.municipality,
          });
        } else {
          console.warn('Skipping incomplete airport record:', row);
        }
      }
    })
    .on('end', async () => {
      try {
        await Airport.bulkCreate(airports);
        console.log('Airport data migration completed.');
      } catch (error) {
        console.error('Error during data migration:', error);
      } finally {
        await sequelize.close();
      }
    });
}

migrateAirports().catch((error) => {
  console.error('Error during migration script execution:', error);
});

module.exports = { migrateAirports };
