import { Router } from "express";
import { addToCart, removeFromCart } from "./cart.controller.js";
import { addCartValidator, deleteProductToCartValidator } from "../middlewares/cart-validator.js";

const router = Router();
router.post("/cart", addCartValidator, addToCart);

router.delete("/deleteProductC", deleteProductToCartValidator, removeFromCart)


export default router;