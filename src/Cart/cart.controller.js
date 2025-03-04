import Cart from "./cart.model.js"
import Product from "../Product/products.model.js"

export const addToCart = async (req, res) => {
    try {
        const { usuarioId, productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado."
            });
        }

        let cart = await Cart.findOne({ user: usuarioId, status: 'active' });
        if (!cart) {
            cart = new Cart({ user: usuarioId, products: [] });
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
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