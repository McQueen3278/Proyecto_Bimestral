import { Router } from "express";
import { addProduct } from "./products.controller.js";
import { addProductValidator } from "../middlewares/product-validator.js";

const router = Router();

router.post("/addProduct", addProductValidator, addProduct)

export default router;