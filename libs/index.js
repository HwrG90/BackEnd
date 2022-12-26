const ProductosMongoDB = require('./productoLibs');
const CarritoMongoDB = require('./carritoLibs');
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