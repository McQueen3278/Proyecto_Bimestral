import { Router } from "express";
import { getOrderHistory } from "./order.controller.js";
import { historyValidate } from "../middlewares/order-validator.js";

const router = Router()

/**
 * @swagger
 * /getHistory:
 *   get:
 *     summary: Retrieve order history
 *     description: Retrieve the order history for a user.
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: The order ID
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the order
 *                   total:
 *                     type: number
 *                     description: The total amount of the order
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

router.get("/getHistory", historyValidate, getOrderHistory)

export default router