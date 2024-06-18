require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const APP_HOST = process.env.APP_HOST;
const APP_PORT = process.env.APP_PORT;
const APP_PATH = process.env.APP_PATH;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Airline Company 1 1',
      version: '1.0.0',
      description: 'Airline Company 1 REST API',
    },
    servers: [
      {
        url: `http://${APP_HOST}:${APP_PORT}/${APP_PATH}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;