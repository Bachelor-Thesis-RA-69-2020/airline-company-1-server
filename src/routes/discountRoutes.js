const express = require('express');
const router = express.Router();
const discountController = require('../controller/discountController');

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscountCreationDTO:
 *       type: object
 *       required:
 *         - flightNumber
 *         - validFrom
 *         - validTo
 *         - percentage
 *       properties:
 *         flightNumber:
 *           type: string
 *           description: Flight number for which the discount is applicable
 *         validFrom:
 *           type: string
 *           format: date-time
 *           description: Start date and time when the discount is valid
 *         validTo:
 *           type: string
 *           format: date-time
 *           description: End date and time when the discount is valid
 *         percentage:
 *           type: number
 *           format: float
 *           description: Discount percentage
 */

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountCreationDTO'
 *     responses:
 *       '201':
 *         description: Discount created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post('/discounts', discountController.create);

module.exports = router;
