const { body }  = require('express-validator');
const validateResult = require('./validatorResult')


const validaRegister = [
    body('nombre', "No ingreso su nombre")
        .exists(),
    body('correo', "Debe ingresar su correo")
        .isEmail()
        .normalizeEmail(),
    body('contrasena', "Debe tener minimo 6 caracteres")
        //.isStrongPassword(), // Activar si desea una contraseña extremadamente segura
        .isLength({min:6}),
    body('telefono', "debe ingresar un numero de telefono")
        .isNumeric(),
    body('edad', "debe ingresar su edad")
        .isNumeric(),
    body('direccion',"Debe ingresar su direccion"),
        (req, res) => {
            validateResult(req, res)
        }
]


module.exports = validaRegister;