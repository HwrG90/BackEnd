const express = require('express')
const productosRouter = express.Router();
const Token = require("../middlewares/token");
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} = require("../controller/productosController");

/* ------------------------ ProductosRouter ------------------------- */

// GET api/productos
productosRouter.get(`/`, getAllProducts);

// GET api/productos/:id
productosRouter.get(`/:id`,Token, getProductById);

// POST api/productos
productosRouter.post(`/`,Token, addProduct);

// PUT api/productos/:id
productosRouter.put(`/:id`,Token, updateProductById);

// DELETE /api/productos/:id
productosRouter.delete(`/:id`,Token, deleteProductById);

module.exports = productosRouter;