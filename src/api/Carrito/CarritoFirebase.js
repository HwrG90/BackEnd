const { queryCarritos, queryProductos, FieldValue } = require(`../../config/firebase.js`);
const CrudFirebase = require(`../../lib/Firebase/carritoFirebase.js`);

class CarritoDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryCarritos, queryProductos, FieldValue);
    };
};

module.exports = CarritoDAOFirebase;