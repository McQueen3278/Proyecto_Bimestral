import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getMostSoldProducts, findProductByName } from "./products.controller.js";
import { addProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js";

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the catalog.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/addProduct", addProductValidator, addProduct)

/**
 * @swagger
 * /viewCatalog:
 *   get:
 *     summary: View product catalog
 *     description: Retrieve the list of all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/viewCatalog", getProducts)

/**
 * @swagger
 * /getProductById/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/getProductById/:id", getProductByIdValidator, getProductById)

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update the details of an existing product.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct)

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the catalog.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct)

/**
 * @swagger
 * /mostSold:
 *   get:
 *     summary: Get most sold products
 *     description: Retrieve the list of most sold products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of most sold products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/mostSold", getMostSoldProducts)

/**
 * @swagger
 * /getByName:
 *   get:
 *     summary: Find product by name
 *     description: Retrieve a product by its name.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the product
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/getByName", findProductByName)

export default router;