const express = require('express');
const router = express.Router();
const modelo_usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const convert = require('xml-js');

function jsonToXml(jsonData) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const xmlData = convert.json2xml(jsonData, options);
  return xmlData;
} 

router.get('/', async(req, res) => {
  res.json({mensaje: 'Funciona!'})
})

router.post('/', async(req, res) => {
    try {
      const jsonData = req.body;

      const nombre = jsonData.usuario.nombre
      const pin = jsonData.usuario.pin.toString();

      const user = await modelo_usuario.findOne({ nombre });

      if (!user) {
        console.log('Usuario no encontrado');
        const errorResponse = {
          mensaje: 'Usuario no encontrado'
        };

        const xmlError = jsonToXml(errorResponse);

        res.set('Content-Type', 'application/xml');
        return res.status(400).send(xmlError);
      }
      
      if (!bcrypt.compareSync(pin, user.pin)) {
        console.log('Pin inválido');
        const errorResponse = {
          mensaje: 'Contraseña inválida'
        };

        const xmlError = jsonToXml(errorResponse);

        res.set('Content-Type', 'application/xml');
        return res.status(400).send(xmlError);
      }

      let token = jwt.sign({
        data: user
      }, 'secret', { expiresIn: 60 * 30 });

      const response = {
          user: {
            nombre:  user.nombre,
            role: user.role 
          },
          token: token
      };     

      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const xmlResponse = convert.js2xml({ response }, options);
      console.log(xmlResponse)

      res.set('Content-Type', 'application/xml');
      res.send(xmlResponse);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }  
});

module.exports = router;