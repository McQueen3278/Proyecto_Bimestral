import Cart from "./cart.model.js"
import Product from "../Product/products.model.js"

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const usuario = req.usuario;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado."
            });
        }

        let cart = await Cart.findOne({ user: usuario._id, status: 'active' });
        if (!cart) {
            cart = new Cart({ user: usuario._id, products: [] });
        }

        const productI = cart.products.findIndex(products => products.product.toString() === productId);
        if (productI > -1) {
            cart.products[productI].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }


        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Producto agregado al carrito exitosamente.",
            cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al agregar el producto al carrito.",
            error: err.message
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const usuario = req.usuario;

        let cart = await Cart.findOne({ user: usuario._id, status: 'active' });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "No tienes un carrito activo."
            });
        }

        const productI = cart.products.findIndex(products => products.product.toString() === productId);
        
        if (productI === -1) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado en el carrito."
            });
        }

        const product = cart.products[productI];
        
        if (quantity > product.quantity) {
            return res.status(400).json({
                success: false,
                message: "La cantidad a eliminar es mayor que la cantidad en el carrito."
            });
        }

        product.quantity -= quantity;

        if (product.quantity === 0) {
            cart.products.splice(productI, 1);
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Producto actualizado en el carrito exitosamente.",
            cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al eliminar el producto del carrito.",
            error: err.message
        });
    }
};

