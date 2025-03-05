import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category.validator.js";

const router = Router();

/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Error creating category
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
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
 *                   description:
 *                     type: string
 *       500:
 *         description: Error retrieving categories
 */
router.get("/", getCategories);

/**
 * @swagger
 * /category/updateCategory/{cid}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /category/deleteCategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;