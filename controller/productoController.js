const Productos = require(`../api/productoApi`)
const ProductosMongoDB = new Productos();


const addProduct = async (req, res) => {
    try {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.query.thumbnail;
        const descripcion = req.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(req.body.codigo);
        const stock = Number(req.body.stock);

        const newProducto = {
            timestamp: date,
            nombre: `${name}`,
            descripcion: `${descripcion}`,
            codigo: code,
            thumbnail: `${url}`,
            precio: price,
            stock: stock,
        };
        const id = await ProductosMongoDB.save(newProducto);
        return res.json(`Se agrego el nuevo Producto`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear un producto ${err}`
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await ProductosMongoDB.getAll();
        return res.json(allProducts);
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los Productos ${err}`
        })
    }
}

const getProductById = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productbyid = await ProductosMongoDB.getById(idCart);

        if (!productbyid) {
            return res.status(404).json({
                error: `Error Producto no encontrado`
            })
        } else {
            return res.json(productbyid);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener el producto por id ${err}`
        })
    }
}

const updateProductById = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.thumbnail;
        const description = req.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(req.body.codigo);
        const stock = Number(req.body.stock);

        await ProductosMongoDB.updateById(idProduct, name, price, url, description, date, code, stock);
        return res.json(`Se Actualizo el Producto`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al Actualizar el producto ${err}`
        })
    }
}

const deleteProductById = async (req, res) => {
    try{
        const id = req.params.id;
        await ProductosMongoDB.deleteById(id);
        return res.json(`Se elimino de forma correcta el ID:${id}`);
    }catch(err){
        return res.status(404).json({
            error: `Error al Borrar un producto por id ${err}`
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};