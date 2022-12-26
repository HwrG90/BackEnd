const mongoDB = require('../config/mongoDB');

const carritoModel = require('../models/carritoModels');
const productsModel = require(`../models/productoModels`);

const CrudMongoDB = require('../services/carritoServices');

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel);
    };
};

module.exports = CarritoDAOMongoDB;