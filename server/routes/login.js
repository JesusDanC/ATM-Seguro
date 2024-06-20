const express = require('express');
const router = express.Router();
const modelo_usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
    try {
      const jsonData = req.body;
      const nombre = jsonData.usuario.nombre
      const pin = jsonData.usuario.pin.toString();

      const user = await modelo_usuario.findOne({ nombre });

      if(!user){
        console.log('Usuario no encontrado')      
        return res.status(400).json({
          mensaje: 'Usuario no encontrado',
        });
      }
      
      if( !bcrypt.compareSync(pin, user.pin) ){
        console.log('Pin invalido')      
        return res.status(400).json({
          mensaje: 'Contraseña invalida',
        }); 
      }

      let token = jwt.sign({
        data: user
      }, 'secret', { expiresIn: 60 * 30 });

      return res.json({
        user,
        token: token
      })

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }  
});

module.exports = router;