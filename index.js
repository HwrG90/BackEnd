const express = require("express");
const cors = require("cors");
const connection = require("./data/db")

const PORT = 8080;
const app = express();
const controller = require("./controller");
const Token = require("./middlewares/Token");

app.use(cors());
app.use(express.json());

app.get("/user", Token, controller.getUserById);
app.post("/register", controller.register);
app.post("/login", controller.login);

connection;

app.listen(PORT, () => {
    console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
});