import User from "../User/user.model.js"
import { hash, verify } from "argon2"
import {generateJWT} from "../helpers/generate-jwt.js"

const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ username: "admin" });


        if (!existingAdmin) {
            const hashedPassword = await hash("admin");

            const admin = new User({
                name: "Admin",
                surname: "Supermarket",
                username: "admin",
                email: "admin@supermarket.com",
                password: hashedPassword,
                role: "ADMIN_ROLE", 
                phone: "12345678", 
                nit: "" 
            });

   
            await admin.save();
            console.log("Admin creado correcaamente.");
        } else {
            console.log("Ya existe un administrador.");
        }
    } catch (error) {
        console.error("Error al crear usuario", error);
    }
};

export default createAdminUser;

export const register = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                name:user.name,
                role: user.role
                

            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}