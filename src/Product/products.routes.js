import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./products.controller.js";
import { addProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js";

const router = Router();

router.post("/addProduct", addProductValidator, addProduct)

router.get("/viewCatalog", getProducts)

router.get("/getProductById/:id", getProductByIdValidator, getProductById)

router.put("/updateProduct/:id", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct)

export default router;