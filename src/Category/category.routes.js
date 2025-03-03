import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category.validator.js";

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);

router.get("/", getCategories);

router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;