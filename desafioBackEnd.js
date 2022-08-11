const Contenedor = require("./contenedor");
const products = new Contenedor("productos.txt");

const express = require("express");
const app = express();
const puerto = 8080;

products.init();

const server = app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

app.on("error", (error) => {
  console.log(error);
});

app.get("/", (req, res) => {
  res.send(`
  <h1 style='color:darkblue;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  '>Express funcionando correctamente</h1>`);
});

app.get("/productos", (req, res) => {
  res.send(products.getAll());
});

app.get("/productosRandom", (req, res) => {
  res.send(
    products.getById(Math.floor(Math.random() * (products.countID - 1 + 1) + 1))
  );
});

app.get("*", (req, res) => {
  res.send(`<h1 style='color:darkred; 
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;'
  >404 - Page Not Found </h1>`);
});
