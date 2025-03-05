import { Router } from "express";
import { getOrderHistory } from "./order.controller.js";
import { historyValidate } from "../middlewares/order-validator.js";

const router = Router()

router.get("/getHistory", historyValidate, getOrderHistory)

export default router