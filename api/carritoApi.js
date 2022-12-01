const mongoDB = require('../config/mongoDB');

const carritoModel = require('../models/carrito');
const productsModel = require(`../models/producto`);

const CrudMongoDB = require('../libs/mongoDB/carritoCrud');

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel);
    };
};

module.exports = CarritoDAOMongoDB;