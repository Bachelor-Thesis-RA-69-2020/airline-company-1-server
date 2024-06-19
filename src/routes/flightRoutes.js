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

module.exports = router;
