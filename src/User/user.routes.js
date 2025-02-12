import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, deleteUser, deleteAccount } from "./user.controller.js";
import { getUserByIdValidator, getUsersValidator, updatePasswordValidator, updateUserValidator, deleteUserValidator, deleteAccountValidator } from "../middlewares/user-validator.js";


const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/",getUsersValidator, getUsers)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.delete("/deleteAccount/:uid", deleteAccountValidator, deleteAccount)

export default router;