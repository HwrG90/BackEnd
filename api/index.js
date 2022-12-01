const ProductosMongoDB = require('./productosApi');
const CarritoMongoDB = require('./carritoApi');
require('dotenv').config()

const getStorage = () => {
    const storage = process.env.STORAGE;
    switch (storage) {
        case `MongoDB`:
            return {
                productos: new ProductosMongoDB(),
                carrito: new CarritoMongoDB()
            }
            break
        default:
            return {
                productos: new ProductosMongoDB(),
                carrito: new CarritoMongoDB()
            }
            break
    }
}

module.exports = getStorage;