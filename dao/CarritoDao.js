const mongoDB = require(`../config/db`);
const carritoModel = require(`../models/carrito`);
const productsModel = require(`../models/producto`);

const log4js = require('../utils/logs');
const loggerConsole = log4js.getLogger('default');
const loggerArchiveWarn = log4js.getLogger('warnArchive');
const loggerArchiveError = log4js.getLogger(`errorArchive`);

class ContenedorCarrito {
    async createCart() {
        let date = new Date();
        let newCart = {
            timestamp: date,
            products: []
        };
        const cart = new carritoModel(newCart);
        mongoDB
            .then(_ => cart.save())
            .then(document => document._id.toString())
            .catch(err => loggerArchiveError.error(`Error:${err.message}`));
    }
    async getProductsById(idCart) {
        let docs = false
        docs = await carritoModel.findOne({ _id: idCart }, { __v: 0 })
        if (docs) {
            return docs.products;
        } else {
            return false;
        }
    }
    async deleteCartById(idCart) {
        mongoDB
            .then(_ => carritoModel.deleteOne({
                _id: idCart
            }))
            .then(result => loggerConsole.info(result))
            .catch(err => loggerArchiveError.error(`Error:${err.message}`));
    }
    async addProduct(idCart, idProduct) {
        let docCart = false
        let docProduct = false

        docCart = await carritoModel.findOne({ _id: idCart }, { __v: 0 });
        docProduct = await productsModel.findOne({ _id: idProduct }, { __v: 0 })

        if (docCart && docProduct) {
            docCart.products.push(docProduct);
            return docCart.save()
        } else {
            loggerArchiveError.error(`Error al acceder al id del carrito / producto`)
        }
    }
    async deleteProductById(idCart, idProduct) {
        let docCart = false
        let docProduct = false

        docCart = await carritoModel.findOne({ _id: idCart }, { __v: 0 })
        docProduct = await productsModel.findOne({ _id: idProduct }, { __v: 0 })

        if (docCart && docProduct) {
            let allProductsFromCart = docCart.products;
            let products = [];

            for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
                if (allProductsFromCart[i]._id.toString() != docProduct._id.toString()) {
                    products.push(allProductsFromCart[i])
                }
            }
            docCart.products = products;
            return docCart.save()
        } else {
            loggerArchiveError.error(`Error al acceder al id del carrito / producto`)
        }
    }
}

module.exports = ContenedorCarrito;