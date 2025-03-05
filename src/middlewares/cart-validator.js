import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./role-validator.js";
import { handleErrors } from "./handle-errors.js";

export const addCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteProductToCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const getCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE")
]