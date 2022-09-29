const { queryProductos } = require(`../../config/firebase`);
const CrudFirebase = require(`../../lib/Firebase/productosFirebase`);

class ProductosDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryProductos);
    };
};

module.exports = ProductosDAOFirebase;