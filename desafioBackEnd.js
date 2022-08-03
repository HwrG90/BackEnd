const fs = require("fs");
class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    this.arr = [];
  }

  //Genera ID

  async generateId() {
    try {
      this.arr = await this.getAll();
      
      let maxId = this.arr.length;
      
      this.arr.forEach((el) => {

        el.id > maxId ? (maxId = el.id) : maxId;
      });

      return maxId + 1;
    } catch (err) {
      console.log(err);
    }
  }

  //Guarda un objeto

  async save(obj) {
    try {
      const readFile = await this.getAll();
      if (!readFile) {
        obj.id = await this.generateId();
        
        this.arr.push(obj);

        fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
        return obj.id;
      }
      console.log("readFile", readFile);
      this.arr = readFile;
      
      obj.id = await this.generateId();

      this.arr.push(obj);

      fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
      return obj.id;
    } catch (err) {
      console.log(err);
    }
  }

  //Devuelve el objeto con el ID buscado

  async getById(id) {
    try {
      this.arr = await this.getAll();

      const obj = this.arr.find((el) => el.id === Number(id));

      return obj ? obj : null;
    } catch (err) {
      console.log(`Ocurrió un error ${err.message}`);
      console.log(err);
    }
  }

  //Devuelve un array con los objetos presentes en el archivo

  async getAll() {
    try {
      const arr = await fs.promises.readFile(this.fileName, "utf-8");

      const arrParsed = JSON.parse(arr);

      return arrParsed;
    } catch (err) {
      console.log(err);
    }
  }

  //Elimina del archivo el objeto con el ID buscado

  async deleteById(id) {
    try {
      this.arr = await this.getAll();

      this.arr = this.arr.filter((el) => el.id != Number(id));

      fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
    } catch (err) {
      console.log(err);
    }
  }
  
  //Elimina todos los objetos guardados en el archivo

  async deleteAll() {
    try {
      this.arr = await this.getAll();

      this.arr = [];
      fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));

    } catch (err) {
      console.log(err);
    }
  }
}
const productos = new Contenedor("contenedor.txt");
