const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PassengerDTO:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *         - passportNumber
 *       properties:
 *         firstName:
 *           type: string
 *           description: Passenger's first name
 *         lastName:
 *           type: string
 *           description: Passenger's last name
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Passenger's date of birth
 *         passportNumber:
 *           type: string
 *           description: Passenger's passport number
 *     BookingDTO:
 *       type: object
 *       required:
 *         - flightNumber
 *         - flightClass
 *         - email
 *         - passengers
 *       properties:
 *         flightNumber:
 *           type: string
 *           description: Flight number for which the booking is made
 *         flightClass:
 *           type: string
 *           description: Class of the flight (Economy, Business, First)
 *         email:
 *           type: string
 *           description: Email address of the person making the booking
 *         passengers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PassengerDTO'
 *           description: List of passengers for the booking
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingDTO'
 *     responses:
 *       '201':
 *         description: Booking created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post('/bookings', bookingController.book);

module.exports = router;
