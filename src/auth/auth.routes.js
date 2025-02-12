import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator, roleValidator } from "../middlewares/user-validator.js";

const router = Router();

router.post("/register",registerValidator, roleValidator,  register)

router.post("/login", loginValidator, login)



export default router;  