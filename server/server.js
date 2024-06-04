var express = require('express');
require ('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { conexion_base_datos } = require('./database/config');

var app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }))

conexion_base_datos();

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/cuentas', require('./routes/cuentas'));
app.use('/api/tarjetas', require('./routes/tarjetas'));
app.use('/api/transacciones', require('./routes/transacciones'));
app.use('/api/bitacora', require('./routes/bitacora'));
app.use('/api/login', require('./routes/login'));

app.get('/', (req, res) => {
    res.send('Hola');
});

const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join('../client/dist/index.html', 'dist')));

app.listen(process.env.PORT, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');
});
