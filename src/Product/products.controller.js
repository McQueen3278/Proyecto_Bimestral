import Product from "./products.model.js"
import { productExists }  from "../helpers/db-validator.js"
import Category from "../Category/category.model.js"
export const addProduct = async (req, res) => {
    try{
        const data = req.body;
        const _category = req.category._id

        productExists

        const product =  new Product ({
            ...data,
            category: _category._id
        })
        return res.status(201).json({
            success: true,
            message: "Producto agregado exitosamente.",
            product,
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Hubo un error al agregar el producto.",
            error: err.message,
        });
    }
    
}

