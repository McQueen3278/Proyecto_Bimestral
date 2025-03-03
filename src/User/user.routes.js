import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, deleteUser, deleteAccount } from "./user.controller.js";
import { getUserByIdValidator, getUsersValidator, updatePasswordValidator, updateUserValidator, deleteUserValidator, deleteAccountValidator } from "../middlewares/user-validator.js";


const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/",getUsersValidator, getUsers)

router.patch("/updatePassword", updatePasswordValidator, updatePassword)
  
router.put("/updateUser", updateUserValidator, updateUser)

router.delete("/deleteUser", deleteUserValidator, deleteUser)

router.delete("/deleteAccount", deleteAccountValidator, deleteAccount)

export default router;