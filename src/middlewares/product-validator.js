import { body, param } from "express-validator";
import { productExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./role-validator.js";
import { validateJWT } from "./validate-jwt.js";

export const addProductValidator =[
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("price").notEmpty().withMessage("El precio es requerido"),
    validarCampos,
    handleErrors
]

export const getProductByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]