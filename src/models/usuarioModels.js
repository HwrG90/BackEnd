const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    telefono: { type: Number, required: true },
    edad: { type: Number, required: true },
    direccion: { type: String, required: true },
    foto: { type: String, required: false },
});


module.exports = mongoose.model("Usuario", UsuarioSchema);