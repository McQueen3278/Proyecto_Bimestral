import { Router } from "express";
import { addToCart, removeFromCart, getCart, checkout} from "./cart.controller.js";
import { addCartValidator, deleteProductToCartValidator, getCartValidator, checkoutValidator } from "../middlewares/cart-validator.js";

const router = Router();
router.post("/cart", addCartValidator, addToCart);

router.delete("/deleteProductC", deleteProductToCartValidator, removeFromCart)

router.get("/getCart", getCartValidator, getCart);

router.post("/checkout", checkoutValidator, checkout);

export default router;