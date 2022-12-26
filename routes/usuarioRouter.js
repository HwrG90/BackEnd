const express = require('express')
const usuarioRouter = express.Router();
const Token = require("../middlewares/token");
const {
    register,
    login,
    getUserById,
} = require("../controller/usuarioController");

/* ------------------------ UsuarioRouter ------------------------- */

// POST api/usuario/login
usuarioRouter.post("/login", login);

// POST api/usuario/register
usuarioRouter.post("/register", register);

// GET api/usuario/user
usuarioRouter.get("/user", Token, getUserById);


module.exports = usuarioRouter;