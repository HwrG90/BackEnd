const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const token = req.headers["token"];
    
    if (token) {
        jwt.verify(token,process.env.JWT_Key,(error, data) =>{
            if (error) {
                return res.status(400).json({message: "Token Invalido"});
            } else {
                req.user = data;
                next();
            }
        });
    } else {
        res.status(401).json({message: "Debes enviar un Token"});
    }
}

module.exports = verifyToken;