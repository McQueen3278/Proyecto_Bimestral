import { Router } from "express";
import { addToCart, removeFromCart, getCart } from "./cart.controller.js";
import { addCartValidator, deleteProductToCartValidator, getCartValidator } from "../middlewares/cart-validator.js";

const router = Router();
router.post("/cart", addCartValidator, addToCart);

router.delete("/deleteProductC", deleteProductToCartValidator, removeFromCart)

router.get("/getCart", getCartValidator, getCart);

export default router;