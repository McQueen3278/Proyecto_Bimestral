import { hash, verify } from 'argon2';
import User from './user.model.js';


export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const usuario = req.usuario;
        const { newPassword } = req.body

        const user = await User.findById(usuario._id)

        const matchOldAndNewPassword = await verify(user.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(usuario._id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const usuario = req.usuario;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(usuario._id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req.params
        
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}


export const deleteAccount = async (req, res) => {
    try {
        const usuario = req.usuario;
        const { password } = req.body;

 
        const user = await User.findById(usuario._id);

        if (user.role !== 'CLIENT_ROLE') {
            return res.status(403).json({
                success: false,
                message: "Solo los usuarios con rol CLIENT_ROLE pueden eliminar su cuenta",
            });
        }

        
        const isPasswordCorrect = await verify(user.password, password); 

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta, no se puede proceder con la eliminación",
            });
        }

        const updatedUser = await User.findByIdAndUpdate( usuario._id,{ status: false },{ new: true });

     
        return res.status(200).json({
            success: true,
            message: "Cuenta desactivada correctamente",
            user: updatedUser,
        });

    } catch (err) {
        console.error('Error al eliminar la cuenta:', err); 
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la cuenta",
            error: err.message,
        });
    }
};
