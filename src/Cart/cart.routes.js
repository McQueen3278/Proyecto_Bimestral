import { Router } from "express";
import { addToCart, removeFromCart, getCart, checkout } from "./cart.controller.js";
import { addCartValidator, deleteProductToCartValidator, getCartValidator, checkoutValidator } from "../middlewares/cart-validator.js";

const router = Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product to add to the cart
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - quantity
 *           properties:
 *             productId:
 *               type: string
 *             quantity:
 *               type: integer
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       500:
 *         description: Error adding product to cart
 */
router.post("/cart", addCartValidator, addToCart);

/**
 * @swagger
 * /deleteProductC:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: productId
 *         description: ID of the product to remove
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       500:
 *         description: Error removing product from cart
 */
router.delete("/deleteProductC", deleteProductToCartValidator, removeFromCart);

/**
 * @swagger
 * /getCart:
 *   get:
 *     summary: Get the current cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved cart
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       500:
 *         description: Error retrieving cart
 */
router.get("/getCart", getCartValidator, getCart);

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: paymentDetails
 *         description: Payment details for the checkout
 *         schema:
 *           type: object
 *           required:
 *             - cardNumber
 *             - expirationDate
 *             - cvv
 *           properties:
 *             cardNumber:
 *               type: string
 *             expirationDate:
 *               type: string
 *             cvv:
 *               type: string
 *     responses:
 *       200:
 *         description: Checkout successful
 *       500:
 *         description: Error during checkout
 */
router.post("/checkout", checkoutValidator, checkout);

export default router;