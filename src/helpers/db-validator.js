import User from "../User/user.model.js";
import Category from "../Category/category.model.js";

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const categoryExists = async (cid = "") => {
    const existe = await Category.findById(cid)
    if(!existe){
        throw new Error("No existe la categoría con el ID proporcionado")
    }
}