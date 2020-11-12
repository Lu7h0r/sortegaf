require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { dbConecction } = require('./database/config');

// iniciamos la app
const app = express();
app.use(cors());

// le pasamos todo lo que le vamos a enviar por json
app.use(express.json());

// conexion a la base de datos
dbConecction();

// RUTAS
app.use('/api/crear', require('./routes/index'));
app.use('/api/home', require('./routes/index'));
app.use('/api/actualizar', require('./routes/index'));
app.use('/api/eliminar', require('./routes/index'));
app.use('/api/detalle', require('./routes/index'));
app.use('/api/usuarios', require('./routes/usuarios-route'));
app.use('/api/login', require('./routes/auth'));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(process.env.PORT, () => {
    console.log(
        'Backend Server on Port:' + process.env.PORT,
        '\x1b[32m%s\x1b[0m',
        'Online'
    );
});