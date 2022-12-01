const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/nodeGmail');
require('dotenv').config()

const register = async (req, res) => {
    try {
        const { nombre, correo, contrasena, telefono, edad, direccion } = req.body;
        const user = await Usuario.findOne({ correo });
        //Reviso si existe un usuario con el correo
        if (user) {
            return res.json("Ya exister un usuario con el correo");
            // Revisamos si lleno todos los campos
        } else if (!nombre || !correo || !contrasena || !edad || !telefono || !direccion) {
            return res.json("Falta el nombre / correo/ contraseña / edad / telefono / direccion");
        } else {
            //encripto la contraseña
            bcrypt.hash(contrasena, 10, async (error, contrasenaHasheada) => {
                if (error) {
                    res.json({ error })
                } else {
                    // Creamos un objeto usuario
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contrasena: contrasenaHasheada,
                        telefono,
                        edad,
                        direccion,
                        foto: req.file.filename
                    });

                    // Creamos el Envio de Email
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: 'barlocco@hotmail.es',
                        subject: `Nuevo registro`,
                        html: `
                                <h3>Nuevo registro de usuario!</h3>
                                <p> Datos:</p>
                                <ul>
                                <li> Nombre: ${nuevoUsuario.nombre}</li>
                                <li> Correo: ${nuevoUsuario.correo}</li>
                                <li> Telefono: ${nuevoUsuario.telefono}</li>
                                <li> Edad: ${nuevoUsuario.edad}</li>
                                <li> Direccion: ${nuevoUsuario.direccion}</li>
                                </ul>
                    `
                    }
                    // Pasamos a guardar
                    const userSave = await nuevoUsuario.save();
                    const email = await sendEmail(mailOptions);
                    return res.json({ Mensaje: "USuario Creado Correctamente", userSave, email });
                }
            })
        }
        // En caso de errores
    } catch (err) {
        res.status(404).json({ err: `Error al Crear el Usuario ${err}` });
    }
}

const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        // Vemos Si existe el Correo ingresado
        Usuario.findOne({ correo }).then((usuario) => {
            if (!usuario) {
                return res.json({ mensaje: "Usuario no encontrado" });
            }
            // Vemos Si existe la Contraseña Ingresada
            bcrypt.compare(contrasena, usuario.contrasena).then((esCorrecta) => {
                if (esCorrecta) {
                    const { id, nombre } = usuario;

                    const data = {
                        id,
                        nombre,
                    };
                    // Creamos un Token
                    const token = jwt.sign(data, process.env.JWT_Key, {
                        expiresIn: 86400 // Dura 24hrs
                    });

                    res.json({
                        mensaje: "Usuario logeado correctamente",
                        usuario: {
                            id,
                            nombre,
                            token,
                        },
                    });
                } else {
                    return res.json({ mensaje: "Contraseña incorrecta" });
                }
            });
        });
    } catch (err) {
        res.status(404).json({ err: `Error al intentar ingresar${err}` });
    }
};

const getUserById = (req, res) => {
    try{
        const { id } = req.user;
        try {
            Usuario.findById(id).then((usuario) => {
                if (!usuario) {
                    return res.json({ mensaje: "No se Encontro ningun usuario con esa ID" })
                } else {
                    const { _id, contrasena, __v, ...resto } = usuario._doc;
                    res.json(resto);
                }
            });
        } catch (err) {
            res.json({ mensaje: "Estas enviando una contraseña incorrecta" });
        }
    }catch(err){
        res.status(404).json({ err: `Error en ver su informacion${err}` });
    }
};

module.exports = {
    register,
    login,
    getUserById,
}