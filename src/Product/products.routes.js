import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct } from "./products.controller.js";
import { addProductValidator, getProductByIdValidator, updateProductValidator } from "../middlewares/product-validator.js";

const router = Router();

router.post("/addProduct", addProductValidator, addProduct)

router.get("/viewCatalog", getProducts)

router.get("/getProductById/:id", getProductByIdValidator, getProductById)

router.put("/updateProduct/:id", updateProductValidator, updateProduct)

export default router;