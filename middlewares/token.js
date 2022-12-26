const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers["token"];
    
    if (token) {
        jwt.verify(token,"secreto",(error, data) =>{
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