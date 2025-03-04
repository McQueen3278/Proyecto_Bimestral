import { Router } from "express";
import { addToCart } from "./cart.controller.js";
import { addCartValidator } from "../middlewares/cart-validator.js";

const router = Router();
router.post("/cart", addCartValidator, addToCart);

export default router;