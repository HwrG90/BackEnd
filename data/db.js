const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/ecommerce';

//  database connection with mongoose

const connection = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conectado a MONGODB"))
    .catch((e) => console.log("Error en la coneccion de MONGODB", e))

module.exports = connection;