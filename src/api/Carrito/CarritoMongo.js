const mongoDB = require(`../../config/mongoDB.js`);

const carritoModel = require(`../../models/carrito.js`);
const productsModel = require(`../../models/producto.js`);

const CrudMongoDB = require(`../../lib/MongoDB/carritoCrud.js`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel);
    };
};

module.exports = CarritoDAOMongoDB;