import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./role-validator.js";
import { handleErrors } from "./handle-errors.js";

export const  historyValidate = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    handleErrors
]