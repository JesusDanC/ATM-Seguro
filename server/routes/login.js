const express = require('express');
const router = express.Router();
const modelo_usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async(req, res) => {
  res.json({mensaje: 'Funciona!'})
})

router.post('/', async(req, res) => {
    const body = req.body;
  
    try {
      const user = await modelo_usuario.findOne({nombre: body.nombre});
  
      if(!user){
        console.log('Usuario no encontrado')      
        return res.status(400).json({
          mensaje: 'Usuario no encontrado',
        });
      }
  
      if( !bcrypt.compareSync(body.pin, user.pin) ){
        console.log('Pin invalido')      
        return res.status(400).json({
          mensaje: 'Contraseña invalida',
        }); 
      }

      let token = jwt.sign({
        data: user
      }, 'secret', { expiresIn: 60 * 30})

      return res.json({
        user,
        token: token
      })
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  });

module.exports = router;