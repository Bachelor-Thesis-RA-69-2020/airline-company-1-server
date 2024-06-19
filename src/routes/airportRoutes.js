const express = require('express');
const router = express.Router();
const airportController = require('../controller/airportController');

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Airport:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         iata:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         elevation:
 *           type: number
 *         continent:
 *           type: string
 *         country:
 *           type: string
 *         region:
 *           type: string
 *         municipality:
 *           type: string
 */

/**
 * @swagger
 * /airports:
 *   get:
 *     summary: Retrieve all airports
 *     tags: [Airports]
 *     responses:
 *       '200':
 *         description: A list of airports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Airport'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/airports', airportController.findAll);

/**
 * @swagger
 * /airports/search:
 *   get:
 *     summary: Search airports by name or IATA code
 *     tags: [Airports]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Search string to filter airports by name or IATA code
 *     responses:
 *       '200':
 *         description: A list of airports matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Airport'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/airports/search', airportController.search);

module.exports = router;
