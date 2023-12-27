const express = require('express');
const orderController= require('../controllers/orderController')
const router = express.Router();
const  userAuth = require('../middleware/userauth'); 

router.post('/:userId', orderController.createOrder);
router.put('/:id/status', orderController.viweStatus);
router.get('/:userId', userAuth, orderController.orderHistorty )

module.exports = router;

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your order request body properties here
 *             required:
 *               // List the required properties for creating an order
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Bad request, check your request data
 */

/**
 * @swagger
 * /order/{id}/status:
 *   put:
 *     summary: Update the status of an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your order status update request body properties here
 *             required:
 *               // List the required properties for updating order status
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '400':
 *         description: Bad request, check your request data
 *       '404':
 *         description: Order not found
 */

/**
 * @swagger
 * /order/{userId}:
 *   get:
 *     summary: Get order history by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: User or order history not found
 */
