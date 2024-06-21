var express = require('express');

require ('dotenv').config();
const xmlParser = require('express-xml-bodyparser');
const morgan = require('morgan');
const cors = require('cors');
const { conexion_base_datos } = require('./database/config');
const { encriptar, desencriptar } = require('./middlewares/encriptacion');

var app = express();

const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ['http://134.25.0.1:5173', 'http://134.25.0.254:5173', "http://localhost:5173"];
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS')); 
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'] 
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(xmlParser());
app.use(desencriptar);
app.use(encriptar);

conexion_base_datos();

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/cuentas', require('./routes/cuentas'));
app.use('/api/tarjetas', require('./routes/tarjetas'));
app.use('/api/transacciones', require('./routes/transacciones'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/bitacora', require('./routes/bitacora'));
app.use('/api/login', require('./routes/login'));

app.get('/', (req, res) => {
    res.send('Hola');
});

const history = require('connect-history-api-fallback');
app.use(history());

app.listen(process.env.PORT, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');
});
