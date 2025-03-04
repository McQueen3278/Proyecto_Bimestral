import Product from "./products.model.js"

export const addProduct = async (req, res) => {
    try {
        const { name, description, category, amount, price } = req.body;


        if (!category) {
            return res.status(400).json({
                success: false,
                message: "No se encontró la categoría en la solicitud."
            });
        }

        const product = new Product({
            name,
            description,
            category,
            amount,
            price
        });

        await product.save();

        const modifyProduct = await Product.findById(product._id).populate("category", "name");

        return res.status(201).json({
            success: true,
            message: "Producto agregado exitosamente.",
            product: modifyProduct,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al agregar el producto.",
            error: err.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");

        return res.status(200).json({
            success: true,
            message: "Productos obtenidos exitosamente.",
            products,
            });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Hubo un error al buscar el producto.",
                    error: err.message,
                });
            }
};

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;

        const products = await Product.findById(id).populate("category", "name");

        return res.status(200).json({
            succes: true,
            message: "Producto obtenido exitosamente.",
            products
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Hubo un error al buscar el producto.",
            error: err.message,
        });
    }
    
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const product = req.product
       
        const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true});
        return res.status(200).json({
            success: true,
            message: "Producto actualizado exitosamente",
            updateProduct
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Hubo un error al actualizar el producto.",
            error: err.message,
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id,{status: false}, {new: true});
        return res.status(200).json({
            success: true,
            message: "Producto eliminado exitosamente",
            product
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Hubo un error al eliminar el producto.",
            error: err.message,
        })
    }
}


