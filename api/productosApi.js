const mongoDB = require('../config/mongoDB');
const productsModel = require(`../models/producto`);;

const CrudMongoDB = require(`../libs/mongoDB/productosCrud`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;