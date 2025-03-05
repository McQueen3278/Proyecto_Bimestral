import Order from "./order.model.js"


export const getOrderHistory = async (req, res) => {
    try {
      const usuario = req.usuario;
  
      const orders = await Order.find({ user: usuario._id }).populate('products.product', 'name price');
  
      return res.status(200).json({
        success: true,
        message: 'Historial de compras obtenido exitosamente.',
        orders,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Hubo un error al obtener el historial de compras.',
        error: err.message,
      });
    }
  };