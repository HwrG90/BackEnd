const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const productosRouter = require('./routes/productosRouter');
const carritoRouter = require('./routes/carritoRouter');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

// api/productos/
// api/carrito/
app.use((req, res) => {
    res.json({ error:-2, descripcion: 'ruta X método Y no autorizada'});
});

const server = app.listen(PORT, () => {
    console.log(`Server Escuchando puerto: ${PORT}`)
});

server.on('error', (error) => {
    console.log('Error en el servidor ', error)
});