import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getMostSoldProducts,findProductByName } from "./products.controller.js";
import { addProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js";

const router = Router();

router.post("/addProduct", addProductValidator, addProduct)

router.get("/viewCatalog", getProducts)

router.get("/getProductById/:id", getProductByIdValidator, getProductById)

router.put("/updateProduct/:id", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct)

router.get("/mostSold", getMostSoldProducts)

router.get("/getByName", findProductByName)

export default router;