const mongoDB = require(`../../config/mongoDB.js`);
const productsModel = require(`../../models/producto.js`);

const CrudMongoDB = require(`../../lib/MongoDB/productosCrud.js`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;