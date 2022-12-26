const express = require('express')
const carritoRouter = express.Router();
const Token = require("../middlewares/token");
const {
    getAllProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
} = require("../controller/carritoController");

/* ------------------------ CarritoRouter ------------------------- */

// GET api/carrito/:id/productos
carritoRouter.get(`/:id/productos`,Token, getAllProductsByIdCart);

// POST /api/carrito
carritoRouter.post(`/`, Token, createCart);

// POST /api/carrito/:idCar/:idProd
carritoRouter.post(`/:idCar/:idProd`,Token, addProduct);

// DELETE /api/carrito/id
carritoRouter.delete(`/:id`,Token, deleteCartById);

// DELETE /api/carrito/:id/productos/:idProd
carritoRouter.delete(`/:id/productos/:id_prod`,Token, deleteProductById);

module.exports = carritoRouter;