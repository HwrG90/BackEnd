const Carrito = require(`../dao/CarritoDao`)
const Productos = require(`../dao/ProductoDao`)
const ProductosMongoDB = new Productos();
const CarritoMongoDB = new Carrito();


const getAllProductsByIdCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsbyId = await CarritoMongoDB.getProductsById(idCart);

        if (productsbyId.length == 0) {
            return res.json(`El carrito se encuentra vacio`);
        } else {
            return res.json(productsbyId);
        }
    } catch (err) {
        return res.status(400).json({
            error: `Error al intentar acceder a un id de producto en el carrito ${err}`
        });
    }
}

const createCart = async (req, res) => {
    try {
        const id = await CarritoMongoDB.createCart();
        return res.json(`Nuevo carrito creado con id:`);
    } catch (err) {
        return res.status(400).json({
            error: `Error al crear carrito ${err}`
        })
    }
}

const addProduct = async (req, res) => {
    try {
        let idCart = Number(req.params.idCar);
        let idProduct = req.params.idProd;

        const product = await ProductosMongoDB.exists(idProduct)

        if (product) {
            await CarritoMongoDB.addProduct(idCart, idProduct);
            return res.json(`Se agrego el producto con id ${idProduct} al carrito con id ${idCart}`)
        }
    } catch (err) {
        return res.status(400).json({
            error: `Error al agregar un producto al carrito ${err}`
        })
    }
}

const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;
        await CarritoMongoDB.deleteCartById(idCart);
        return res.json(`se elimino el carrito`);
    } catch (err) {
        return res.status(400).json({
            error: `Error al eliminar el carrito${err}`
        })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const idCart = req.params.id;
        const idProduct = req.params.id_prod;

        await CarritoMongoDB.deleteProductById(idCart, idProduct);

        return res.json(`El producto con id ${idProduct} del carrito con id ${idCart} fue eliminado`)
    } catch (err) {
        return res.status(400).json({
            error: `Error al eliminar un producto especifico del carrito ${err}`
        })
    }
}

module.exports = {
    getAllProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
};