const express = require('express')
const ordenRouter = express.Router();
const Token = require("../middlewares/token");
const {
    checkout
} = require('../controller/ordenesController')

/* ------------------------ OrdenesRouter ------------------------- */

// GET api/ordenes/:idCar
ordenRouter.get('/:idCar', Token, checkout);

module.exports = ordenRouter