import Cart from "./cart.model.js"
import Product from "../Product/products.model.js"
import Order from "../order/order.model.js"
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

        const modifyCart = await Cart.findById(cart._id).populate("products.product", "name");

        return res.status(200).json({
            success: true,
            message: "Producto agregado al carrito exitosamente.",
            modifyCart
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

        const modifyCart = await Cart.findById(cart._id).populate("products.product", "name");


        return res.status(200).json({
            success: true,
            message: "Producto actualizado en el carrito exitosamente.",
            modifyCart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al eliminar el producto del carrito.",
            error: err.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const usuario = req.usuario;

        const cart = await Cart.findOne({ user: usuario._id, status: 'active' }).populate("products.product", "name price");


        return res.status(200).json({
            success: true,
            message: "Carrito obtenido exitosamente.",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al obtener el carrito.",
            error: err.message
        });
    }
};

const generateInvoice = async (order, user, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(20).text("Factura de Compra", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text(`Cliente: ${user.name || "Usuario Desconocido"}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        doc.fontSize(14).text("Productos:", { underline: true });
        doc.moveDown();

        order.products.forEach((products, index) => {
            doc.fontSize(12).text(`${index + 1}. ${products.product.name} - ${products.quantity} x Q${products.product.price} = Q${products.quantity * products.product.price}`);
        });

        doc.moveDown();
        doc.fontSize(14).text(`Total: Q${order.total}`, { bold: true });

        doc.end();

        stream.on("finish", () => resolve());
        stream.on("error", (err) => reject(err));
    });
};


export const checkout = async (req, res) => {
    try {
        const usuario = req.usuario;

        const cart = await Cart.findOne({ user: usuario._id, status: 'active' }).populate("products.product", "name price amount");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "El carrito está vacío o no existe.",
            });
        }

        let total = 0;
        const insufficientStockProducts = [];

        for (let prod of cart.products) {
            total += prod.product.price * prod.quantity;

            if (prod.product.amount < prod.quantity) {
                insufficientStockProducts.push({
                    productName: prod.product.name,
                    availableStock: prod.product.amount,
                    requestedQuantity: prod.quantity,
                });
            }
        }

        if (insufficientStockProducts.length > 0) {
            return res.status(400).json({
                success: false,
                message: "No hay suficiente stock de los siguientes productos.",
                insufficientStockProducts
            });
        }

        for (let prod of cart.products) {
            await Product.findByIdAndUpdate(prod.product._id, { $inc: { amount: -prod.quantity } });
        }

        const order = new Order({
            user: usuario._id,
            products: cart.products,
            total,
            status: "completed"
        });

        await order.save();

        const invoicePath = path.join(__dirname, `../../public/invoice_${order._id}.pdf`);
        await generateInvoice(order, usuario, invoicePath);

        cart.products = [];
        cart.status = "completed";
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Compra realizada con éxito.",
            order
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Hubo un error al completar la compra.",
            error: err.message
        });
    }
};


