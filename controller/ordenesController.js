const Usuario = require("../models/usuario");
const carritoModel = require('../models/carrito');
const sendEmail = require('../utils/nodeGmail');
const sendSMS = require('../utils/twilioSMS')
const sendWhatsApp = require('../utils/twilioWSP')

require('dotenv').config()

const checkout = async (req, res) => {
    try {
        const { id } = req.user;
        const idCart = req.params.id
        const cart = await carritoModel.findOne(idCart)
        const user = await Usuario.findById(id)

        const productos = `${JSON.stringify(cart.products)}`

        const mailOptions = {
            from: process.env.EMAIL,
            to: `barlocco@hotmail.es`,
            subject: `Nuevo pedido de: ${user.nombre}`,
            html: `
                <h3>Nuevo pedido!</h3>
                <p> Datos del cliente:</p>
                <ul>
                <li> Nombre: ${user.nombre}</li>
                <li> Email: ${user.correo}</li>
                <li> Teléfono: ${user.telefono}</li>
                <li> Direccion: ${user.direccion}</li>
                </ul>
                <p> Pedido:</p>
                <ul>
                ${productos}
                </ul>
            `
        };

        const WhatsApp =
            `Nuevo pedido!
            Datos del cliente:
            Nombre: ${user.nombre}
            Correo: ${user.correo}
            Teléfono: ${user.telefono}
            Direccion: ${user.direccion}
            Pedido:
            ${productos}
            `;

        const WSHTP = await sendWhatsApp(WhatsApp, process.env.TWILIO_WSP, process.env.TWILIO_WSP_USER)
        const email = await sendEmail(mailOptions);
        sendSMS(`Hola ${user.nombre} hemos recibido tu pedido con exito.`, process.env.NUMERO_TWILIO, process.env.NUMERO_USER)
        return res.json({ mensaje: "Su compra a sido Exitosa", productos, email, WSHTP });

    } catch (err) {
        res.status(404).json({ err: `Error al intentar comprar ${err}` });
    }
}
module.exports = {
    checkout
}