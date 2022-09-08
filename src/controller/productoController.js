const uuid = require('uuid');
const productos = require('../lib/producto');
let myProductos = new productos('./data/productos.txt');

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await myProductos.listar();
        return res.json(allProducts);
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
}

const getProductById = async (req, res) => {
    try {
        let productbyId = await myProductos.listarId(req.params.id);
        if (productbyId.length == 0) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return res.json(productbyId);
        }
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
}

const addProduct = async (req, res) => {
    try {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.thumbnail;
        const description = req.body.descripcion;
        const date = new Date().toDateString();
        const code = uuid.v4();
        const stock = Number(req.body.stock);

        const newProducto = {
            timestamp: date,
            nombre: `${name}`,
            descripcion: `${description}`,
            codigo: code,
            thumbnail: `${url}`,
            precio: price,
            stock: stock
        };
        const id = await myProductos.guardar(newProducto);
        return res.json(`El id Asignado es : ${id}`);
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
}

const updateProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.thumbnail;
        const description = req.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(req.body.codigo);
        const stock = Number(req.body.stock);

        let allProducts = await myProductos.listar();
        const productIndex = allProducts.findIndex(product => product.id === id);

        if (productIndex < 0) {
            return res.json({ error: `Producto no encontrado` });
        }
        allProducts[productIndex].nombre = name || allProducts.nombre;
        allProducts[productIndex].thumbnail = url || allProducts.thumbnail;
        allProducts[productIndex].timestamp = date;
        allProducts[productIndex].descripcion = description || allProducts.descripcion;
        allProducts[productIndex].codigo = code;
        allProducts[productIndex].precio = price || allProducts.precio;
        allProducts[productIndex].stock = stock || allProducts.stock;

        await myProductos.write(allProducts);
        return res.json(`Producto ${id} actualizado`);
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await myProductos.borrarId(id);
        return res.json(`Producto ${id} borrado`);
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
}

module.exports={
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
}