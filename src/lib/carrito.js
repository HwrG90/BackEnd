const fs = require('fs');

class ContenedorCarrito {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async read() {
        try {
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;
        } catch (error) {
            return { error: `Error Al Leer el Archivo ${error}` };
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (error) {
            return { error: `Error Al Escribir en el Archivo ${error}` };
        }
    }

    async guardarCarrito() {
        let nuevoCarrito;
        let date = new Date().toDateString();
        let carrito = {
            id: 0,
            fecha: date,
            products: []
        };
        let data = await this.read();
        let datos = JSON.parse(data);

        if (datos.length === 0) {
            carrito.id = 1;
            nuevoCarrito = carrito;
        } else {
            carrito.id = datos.length ? datos[datos.length - 1].id + 1 : 1;
            nuevoCarrito = carrito;
        }
        datos.push(nuevoCarrito);
        await this.write(datos, `Carrito Guardado`);
        return carrito.id;
    }

    async listarCarrito() {
        let data = await this.read();
        let datos = JSON.parse(data);
        return datos;
    }

    async productoId(idCart) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let result = datos.filter(cart => cart.id == idCart);
        if (result.length == 0) {
            return [];
        } else {
            return result[0].products;
        }
    }

    async carritoId(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);
        let result = datos.filter(cart => cart.id === myId);
        return result;
    }

    async borrarCarrito(idCart) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let cart = datos.find(cart => cart.id == idCart);
            if (cart) {
                let index = datos.indexOf(cart);
                datos.splice(index, 1);
                await this.write(datos, `Carrito con ID: ${idCart} eliminado`)
            } else {
                return (`El carrito con id ${idCart} no existe`);
            }
        } catch (error) {
            return { error: `Error Al Borrar el Carrito ${error}` };
        }
    }

    async eliminarProducto(idC, idP) {
        try {
            let data = await this.read();
            let datos = JSON.parse(data);

            let cart = datos.find(cart => cart.id == idC);
            let product = cart.products.find(product => product.id == idP);

            if (cart && product) {
                let indexProduct = cart.products.indexOf(product);
                cart.products.splice(indexProduct, 1);
                await this.write(datos, `Producto  con ID: ${idP} del carrito con ID ${idC} fue eliminado`);
            } else {
                if (!cart) {
                    return (`Error el carrito no existe`);
                }
                if (!product) {
                    return (`Error el producto no existe`);
                }
            }
        } catch (error) {
            return { error: `Error Al Borrar ${error}` };
        }
    }

    async eliminar() {
        let data = [];
        await this.write(data, `Se elmino todos los productos del carrito`);
    }
}
module.exports = ContenedorCarrito;