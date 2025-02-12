import { Router } from "express";
import { getUserById } from "./user.controller.js";
import { getUserByIdValidator } from "../middlewares/user-validator.js";

const router = Router();

router.get("/findUser/:id", getUserByIdValidator, getUserById)

export default router;