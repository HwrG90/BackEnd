const express = require('express')
const productosRouter = express.Router();
const { getAllProducts, getProductById, addProduct, updateProductById, deleteProductById } = require('../controller/productoController')

/* ------------------------ ProductosRouter ------------------------- */

// GET api/productos
productosRouter.get('/', getAllProducts);

// GET api/productos/:id
productosRouter.get('/:id',getProductById);

// POST api/productos
productosRouter.post('/', addProduct);

// PUT api/productos/:id
productosRouter.put('/:id', updateProductById);

// DELETE /api/productos/:id
productosRouter.delete('/:id', deleteProductById);

module.exports = productosRouter;