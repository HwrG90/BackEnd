const { queryProductos } = require(`../../config/firebase.js`);
const CrudFirebase = require(`../../lib/Firebase/productosFirebase.js`);

class ProductosDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryProductos);
    };
};

module.exports = ProductosDAOFirebase;