import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, deleteUser } from "./user.controller.js";
import { getUserByIdValidator, getUsersValidator, updatePasswordValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validator.js";


const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/",getUsersValidator, getUsers)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

export default router;