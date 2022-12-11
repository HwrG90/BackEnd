const Usuario = require("../models/usuarioModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/nodeGmail');


const register = async (req, res) => {
    try{
        const { nombre, correo, contraseña, telefono,edad,direccion } = req.body;
        const user = await Usuario.findOne({ correo });
        //Reviso si existe un usuario con el correo
        if(user){
            return res.json("Ya exister un usuario con el correo");
        // Revisamos si lleno todos los campos
        } else if (!nombre || !correo || !contraseña || !edad || !telefono || !direccion ){
            return res.json("Falta el nombre / correo/ contraseña / edad / telefono / direccion");
        }else{
            //encripto la contraseña
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada)=> {
                if(error){
                    res.json({ mensaje:"Estas enviando una contraseña incorrecta", error })
                }else {
                    console.log(nombre)
                    // Creamos un objeto usuario
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contraseña:contraseñaHasheada,
                        telefono,
                        edad,
                        direccion,
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
                    const userSave = nuevoUsuario.save();
                    const email= sendEmail(mailOptions);
                    return res.json("Usuario Creado Correctamente", userSave,email);
                }
            })
        }
    // En caso de errores
    }catch(err){
        res.status(404).json({err:`Error al Crear el Usuario ${err}`});
    }
}

const login = async (req, res) => {
    const { correo, contraseña } = req.body;
    // Vemos Si existe el Correo ingresado
    Usuario.findOne({ correo }).then((usuario) => {
        if (!usuario) {
            return res.json({ mensaje: "Usuario no encontrado" });
        }
        // Vemos Si existe la Contraseña Ingresada
        bcrypt.compare(contraseña, usuario.contraseña).then((esCorrecta) => {
            if (esCorrecta) {
                const { id, nombre } = usuario;

                const data = {
                    id,
                    nombre,
                };
                // Creamos un Token
                const token = jwt.sign(data, "secreto", {
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
};

const getUserById = (req, res) => {
    const {id} = req.user;
    try{
        Usuario.findById(id).then((usuario) =>{
            if(!usuario){
                return res.json({mensaje: "No se Encontro ningun usuario con esa ID"})
            } else {
                const { _id, contraseña, __v, ...resto } = usuario._doc;
                res.json(resto);
            }
        });
    }catch(err){
        res.json({mensaje:"Estas enviando una contraseña incorrecta"});
    }
};

module.exports ={
    register,
    login,
    getUserById,
}