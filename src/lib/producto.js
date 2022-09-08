const fs = require('fs');

class ContenedorProductos {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async read() {
        try {
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;
        } catch (error) {
            console.log(`Error Al Leer el Archivo ${error}`);
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (error) {
            console.log(`Error Al Escribir el Archivo ${error}`);
        }
    }

    async guardar(product) {
        let newId = 1;
        let newProduct = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if (!data) {
            product.id = newId;
            newProduct = [product];
        } else {
            product.id = datos.length? datos[datos.length - 1].id + 1:1;
            newProduct = product;
        }
        datos.push(newProduct);

        await this.write(datos, `Agregado!`);

        return product.id;
    }

    async  listarId(myid) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let result = datos.filter(product => product.id == myid);
        return result;
    }

    async listar() {
        let data = await this.read();
        let datos = JSON.parse(data);
        return datos;
    }

    async borrarId(idProduct) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let product = datos.find(product => product.id == idProduct);
        console.log(product);
        if (product) {
            let index = datos.indexOf(product);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${idProduct} eliminado`)
        } else {
            throw Error(`Producto con ID: ${idProduct} no existe`);
        }
    }

    async borrarAll() {
        let data = [];
        await this.write(data, `Productos Borrados`);
    }
};
module.exports = ContenedorProductos;