const express = require('express')
const carritoRouter = express.Router();

const { getAllProductsByIdCart, createCart, addProduct, deleteCartById, deleteProductById } = require('../controller/carritoController')
/* ------------------------ CarritoRouter ------------------------- */

// GET api/carrito/:id/productos
carritoRouter.get('/:id/productos', getAllProductsByIdCart);

// POST /api/carrito
carritoRouter.post('/', createCart);

// POST /api/carrito/:idCar/:idProd
carritoRouter.post('/:idCar/:idProd', addProduct);

// DELETE /api/carrito/id
carritoRouter.delete('/:id', deleteCartById);

// DELETE /api/carrito/:id/productos/:idProd
carritoRouter.delete('/:id/productos/:idProd', deleteProductById);

module.exports = carritoRouter;