const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");
const sendEmail = require('../utils/nodeGmail');

const register = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        const user = await Usuario.findOne({ correo });
        if (user) {
            return res.json({ mensaje: "Ya existe un usuario con ese correo" });
        } else if (!nombre || !correo || !contraseña) {
            return res.json({ mensaje: "Falta el nombre / correo / contraseña" });
        } else {
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
                if (error) res.json({ error });
                else {
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contraseña: contraseñaHasheada,
                    });
                    const mailOptions = {
                        from: 'test@hotmail.es',
                        to: `test.testl81@ethereal.email`,
                        subject: `Nuevo registro`,
                        html: `
                                <h3>Nuevo registro de usuario!</h3>
                                <p> Datos:</p>
                                <ul>
                                <li> Nombre: ${nuevoUsuario.nombre}</li>
                                <li> Email: ${nuevoUsuario.correo}</li>
                                </ul>
                    `
                    }
                    const userSave =  nuevoUsuario.save();
                    const email =  sendEmail(mailOptions);
                    return res.json("Usuario creado correctamente",userSave, email)
                }
            });
        };
    } catch (err) {
        res.status(404).json({
            error: `Error al crear el carrito ${err}`
        });
    }
}
module.exports = register;
