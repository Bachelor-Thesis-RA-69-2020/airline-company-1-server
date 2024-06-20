const express = require('express');
const router = express.Router();
const flightController = require('../controller/flightController');

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightCreationDTO:
 *       type: object
 *       properties:
 *         departureDatetime:
 *           type: string
 *           format: date-time
 *         arrivalDatetime:
 *           type: string
 *           format: date-time
 *         baggageAllowance:
 *           type: string
 *         childrenDiscount:
 *           type: number
 *           format: float
 *         originIATA:
 *           type: string
 *         destinationIATA:
 *           type: string
 *         economyTicketsCount:
 *           type: integer
 *         economyPrice:
 *           type: number
 *           format: float
 *         businessTicketsCount:
 *           type: integer
 *         businessPrice:
 *           type: number
 *           format: float
 *         firstTicketsCount:
 *           type: integer
 *         firstPrice:
 *           type: number
 *           format: float
 *     FlightDTO:
 *       type: object
 *       properties:
 *         flightNumber:
 *           type: string
 *         departureDatetime:
 *           type: string
 *           format: date-time
 *         arrivalDatetime:
 *           type: string
 *           format: date-time
 *         durationMinutes:
 *           type: integer
 *         baggageAllowance:
 *           type: string
 *         economyPrice:
 *           type: number
 *           format: float
 *         businessPrice:
 *           type: number
 *           format: float
 *         firstPrice:
 *           type: number
 *           format: float
 *         discount:
 *           type: number
 *           format: float
 *         childrenDiscount:
 *           type: number
 *           format: float
 */

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightCreationDTO'
 *     responses:
 *       '201':
 *         description: Flight created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post('/flights', flightController.create);

/**
 * @swagger
 * /flights/search:
 *   get:
 *     summary: Search flights with optional query parameters
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Departure date range start (inclusive)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Departure date range end (inclusive)
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Departure airport IATA code
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         description: Destination airport IATA code
 *       - in: query
 *         name: flightClass
 *         schema:
 *           type: string
 *         description: Flight class (Economy, Business, First)
 *       - in: query
 *         name: passengerCount
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of passengers
 *     responses:
 *       '200':
 *         description: A list of flight objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FlightDTO'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.get('/flights/search', flightController.search);

/**
 * @swagger
 * /flights/{flightNumber}:
 *   get:
 *     summary: Retrieve flight by flight number
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: flightNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight number to retrieve
 *     responses:
 *       '200':
 *         description: A flight object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlightDTO'
 *       '404':
 *         description: Flight not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/flights/:flightNumber', flightController.findByFlightNumber);

module.exports = router;
