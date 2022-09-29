const mongoDB = require(`../../config/mongoDB`);
const productsModel = require(`../../models/producto`);

const CrudMongoDB = require(`../../lib/MongoDB/productosCrud`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;