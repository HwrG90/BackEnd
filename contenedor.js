const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.fileName = name;
    this.countID = 0;
    this.content = [];
  }

  // Genera ID

  async init() {
    try {
      let data = await fs.promises.readFile(this.fileName);
      this.content = JSON.parse(data);
      for (const element of this.content) {
        if (element.id > this.countID) this.countID = element.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async write() {
    await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
  }

  // Guarda un objeto 

  save(object) {
    this.countID++;
    object["id"] = this.countID;
    this.content.push(object);
    this.write();
    return `El id del objeto añadido es ${this.countID}`;
  }

//Devuelve objetos presentes en el archivo

  getAll() {
    return this.content;
  }

//Devuelve el ID buscado

  getById(id) {
    let result;
    if (this.content !== []) {
      result = this.content.find((x) => x.id === id);
      if (result === undefined) {
        result = null;
      }
    } else {
      result = "El archivo está vacío";
    }
    return result;
  }

  //Elimina del archivo el objeto con el ID buscado

  async deleteById(id) {
    let result;
    if (this.content !== []) {
      let newContent = this.content.filter((x) => x.id !== id);
      this.content = newContent;
      this.write();
      result = "OK";
    } else {
      result = `El archivo está vacío`;
    }
    return result;
  }

//Elimina todos los objetos guardados en el archivo

  deleteAll() {
    this.content = this.content.splice(0, this.content.length);
    this.write();
  }
}

module.exports = Contenedor;
