const mongoDB = require('../config/mongoDB');
const productsModel = require(`../models/productoModels`);;

const CrudMongoDB = require(`../services/productoServices`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;