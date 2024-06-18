require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./configuration/database');
const swaggerSpec = require('./configuration/swagger');
const userRoutes = require('./routes/flightRoutes');
const airportRoutes = require('./routes/airportRoutes');
const { migrateAirports } = require('./configuration/airportData');

const app = express();
const APP_PORT = process.env.APP_PORT;
const APP_PATH = process.env.APP_PATH;
const SWAGGER_HOST = process.env.SWAGGER_HOST;
const SWAGGER_PORT = process.env.SWAGGER_PORT;
const SWAGGER_PATH = process.env.SWAGGER_PATH;

app.use(`/${SWAGGER_PATH}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(`/${APP_PATH}`, airportRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized.');

    await migrateAirports();

    app.listen(APP_PORT, () => {
      console.log(`\nServer is running on port ${APP_PORT}...`);
      console.log(`\nSwagger UI is available at http://${SWAGGER_HOST}:${SWAGGER_PORT}/${SWAGGER_PATH}.`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
