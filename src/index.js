const express = require('express');
const app = express();
const cors = require("cors");
const session = require('express-session');
const MongoStore = require(`connect-mongo`);
require('dotenv').config()
const PORT = process.env.PORT ||8080;

//Router Import
const productosRouter = require('./routes/productoRouter');
const carritoRouter = require('./routes/carritoRouter');
const usuarioRouter = require('./routes/usuarioRouter')
const otherRouter = require('./routes/otherRouter')

const log4js = require('./utils/log');
const loggerConsole = log4js.getLogger('default');
const loggerArchiveWarn = log4js.getLogger('warnArchive');
const loggerArchiveError = log4js.getLogger(`errorArchive`);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        options: {
            userNewParser: true,
            useUnifiedTopology: true,
        }
    }),
    secret: process.env.SESSIONSECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));


app.use(`/api/productos`, productosRouter);
app.use(`/api/carrito`, carritoRouter);
app.use('/api/usuario', usuarioRouter)
app.use('/api/test', otherRouter);

app.use((req, res, next) => {
    loggerConsole.warn(`
    Estado : 404
    Ruta Consultada : ${req.originalUrl}
    Metodo : ${req.method}`);

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`);

    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
    next();
});

const server = app.listen(PORT, () => {
    loggerConsole.info(`🚀 Server started at http://localhost:${PORT}`)
    })

server.on('error', (err) => loggerArchiveError.error(err))