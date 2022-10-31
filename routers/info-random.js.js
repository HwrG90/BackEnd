const { fork } = require("child_process");

const server = require("express").Router();

server.get("/info", (req, res) => {
  const args =
    process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno";

  res.send(`
    <ul>
    <li>Sistema operativo: ${process.platform}</li>
    <li>Node version: ${process.version}</li>
    <li>Path de ejecución: ${process.execPath}</li>
    <li>Carpeta del proyecto: ${process.cwd()}</li>
  <li>Argumentos de entrada: ${args}</li>
  <li>ID: ${process.pid}</li>
  <li>Memoria total reservada: ${`${Math.round(
    process.memoryUsage().rss / 1024
  )} KB`}</li>
</ul>`);
});

//Randoms

const randomNumbersGeneratorFork = fork('./utils/random.js')

server.get('/randoms', (req, res) => {

    const cant = req.query.cant || 1000 ;

    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);

})

module.exports = server;
