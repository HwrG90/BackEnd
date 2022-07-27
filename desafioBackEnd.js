class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
    getFullName() {
      return `Nombre: ${this.nombre} Apellido: ${this.apellido}`;
    }
    addMascota(mascota) {
      this.mascotas.push(mascota);
    }
    countMascotas() {
      return `Mascotas: ${this.mascotas.length}`;
    }
    addBook(libro) {
      this.libros.push(libro);
    }
    getBookNames() {
      return this.libros.map(
        (libro) => `Libro: ${libro.nombre}  Autor: ${libro.autor}`
      );
    }
  }
  
  //Crea usuario
  
  const usuario = new Usuario(
    "Hernan",
    "Gomez",
    [
      { nombre: "El Matdero", autor: "Esteban Echeverria" },
      { nombre: "El Aleph", autor: "Jorge Luis Borges" },
    ],
    ["Boyero de Berna"]
  );
  
  //Muestra el nombre completo del usuario creado
  
  console.log(usuario.getFullName());
  
  //Agrega una mascota al array de mascotas del usuario
  
  usuario.addMascota("Golden Retriever");
  usuario.addMascota("Beagle");
  
  //Muestra la cantidad de mascostas que tiene el usuario y los nombes de las mascotas
  
  console.log(usuario.countMascotas());
  console.log(usuario.mascotas);
  
  //Agrega un libro al array de libros del usuario
  
  usuario.addBook({ nombre: "Rayuela", autor: "Julio Cortazar" });
  usuario.addBook({ nombre: "Lazarillo de Tormes", autor: "Anonimo" });
  usuario.addBook({ nombre: "La casa de Bernarda Alba", autor: "Federico Garcia Lorca " });
  
  //Muestra los nombres de los libros del usuario
  
  console.log(usuario.getBookNames());
  