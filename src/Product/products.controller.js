import Product from "./products.model.js"
import Category from "../Category/category.model.js"
import Order from "../order/order.model.js"

export const addProduct = async (req, res) => {
    try {
        const data = req.body;
        const category = req.body;
        
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "No se encontró la categoría en la solicitud."
            });
        }

        if(!data.category){
            const sinCategoria = await Category.findOne({ name: "sin_categoria" });
            if(!sinCategoria){
                return res.status(400).json({
                    success: false,
                    message: "La categoria 'sin_categoria' no existe"
                })
            }
            data.category = sinCategoria._id;
        }

        const product = new Product({
            ...data,
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


export const getMostSoldProducts = async (req, res) => {
    try {
      const result = await Order.aggregate([
        { $unwind: "$products" },
        { $group: {
          _id: "$products.product",
          totalQuantitySold: { $sum: "$products.quantity" }
        }},
        { $sort: { totalQuantitySold: -1 } }, 
        { $limit: 10 },
        { $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }},
        { $unwind: "$product" },
        { $project: {
          productName: "$product.name",
          productPrice: "$product.price",
          totalQuantitySold: 1,
        }}
      ]);
  
      return res.status(200).json({
        success: true,
        message: "Productos más vendidos obtenidos exitosamente.",
        products: result,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Hubo un error al obtener los productos más vendidos.",
        error: err.message,
      });
    }
  };

  export const findProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "El nombre del producto es requerido para realizar la búsqueda.",
            });
        }


        const products = await Product.find({name: { $regex: name, $options: "i" },}).populate("category");

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos que coincidan con ese nombre.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Productos encontrados exitosamente.",
            products,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al buscar los productos.",
            error: err.message,
        });
    }
};
