const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

const productRouter = require('./routes/producto')
const otherRouter = require('./routes/other')

const log4js = require('./utils/logs');
const loggerConsole = log4js.getLogger('default');
const loggerArchiveWarn = log4js.getLogger('warnArchive');
const loggerArchiveError = log4js.getLogger(`errorArchive`);


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/test', otherRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

const server = app.listen(PORT, () => {
    loggerConsole.info(`🚀 Server started at http://localhost:${PORT}`)
    })

server.on('error', (err) => loggerArchiveError.error(err))