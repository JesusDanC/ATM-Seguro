const { response } = require('express'); 
const bcrypt = require('bcryptjs');
const convert = require('xml-js');

const modelo_usuario = require('../model/usuario');

function jsonToXml(response) {
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    return convert.js2xml({response}, options);
}

const Ver_usuarios = async(req, res) => {
    try {
        const usuarios = await modelo_usuario.find({}, 'nombre role');

        const users = usuarios.map(usuario => ({
            nombre: usuario.nombre,
            role: usuario.role
        }));

        const xmlData = jsonToXml({ users });
        console.log(xmlData)

        res.set('Content-Type', 'application/xml');
        res.send(xmlData);
    } catch (error) {
        console.log(error);
        const errorResponse = {
          mensaje: 'Error al mostrar datos'
        };

        const xmlError = jsonToXml(errorResponse);

        res.set('Content-Type', 'application/xml');
        return res.status(500).send(xmlError);
    }
    
}

const Crear_usuarios = async(req, res) => {
    const jsonData = req.body.usuario;

    const usuario = {
        nombre: jsonData.nombre.toString(),
        pin: jsonData.pin.toString()
    }

    try {
        const Existe_usuario = await modelo_usuario.findOne({usuario: usuario.nombre});

        if (Existe_usuario) {
            console.log('Usuario ya existe');
            const errorResponse = {
            mensaje: 'El nombre de usuario ya existe'
            };

            const xmlError = jsonToXml(errorResponse);

            res.set('Content-Type', 'application/xml');
            return res.status(400).send(xmlError);
        }
        
        const usuarios = new modelo_usuario( usuario );

        const salt = bcrypt.genSaltSync(10);
        usuarios.pin = bcrypt.hashSync(usuario.pin, salt);
        
        await usuarios.save();

        console.log('Usuario agregado');
        const Response = {
          mensaje: 'Usuario agregado'
        };
        const xmlResponse = jsonToXml(Response);
        res.set('Content-Type', 'application/xml');
        res.send(xmlResponse);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_usuarios = async ( req, res = response) => {
    const nombre = req.params.id;

    try {
        const usuario_buscado = await modelo_usuario.findOne({nombre});

        if(!usuario_buscado) {
            console.log('Usuario no existe');
            const errorResponse = {
            mensaje: 'El usuario no existe'
            };

            const xmlError = jsonToXml(errorResponse);

            res.set('Content-Type', 'application/xml');
            return res.status(400).send(xmlError);
        }
        
        const jsonData = req.body.usuario;

        const usuario = {
            nombre: jsonData.nombre.toString(),
            pin: jsonData.pin.toString()
        }

        if (usuario_buscado.nombre === usuario.nombre) {
            delete usuario.nombre;
        } else {
            const existe_nombre = await modelo_usuario.findOne({ nombre: usuario.nombre });
            if (existe_nombre) {
                console.log('Ese nombre existe');
                const errorResponse = {
                mensaje: 'El nombre de usuario ya existe'
                };

                const xmlError = jsonToXml(errorResponse);

                res.set('Content-Type', 'application/xml');
                return res.status(400).send(xmlError);
            }
        }

        const encriptar = bcrypt.genSaltSync(10);
        usuario.pin = bcrypt.hashSync(usuario.pin, encriptar);

        const usuarioActualizado = await modelo_usuario.findOneAndUpdate({nombre}, usuario, { new: true });

        console.log('Usuario actualizado');
        console.log(usuarioActualizado)
        const Response = {
            mensaje: 'Usuario actualizado'
        };
        const xmlResponse = jsonToXml(Response);
        res.set('Content-Type', 'application/xml');
        res.send(xmlResponse);

    } catch (error) {
        console.log(error);
        const errorResponse = {
            mensaje: 'Error inesperado'
        };

        const xmlError = jsonToXml(errorResponse);

        res.set('Content-Type', 'application/xml');
        return res.status(500).send(xmlError);
    }
}

const Borrar_usuarios = async (req, res = response) => {
    const nombre = req.params.id;
    
    try {
        const usuario_buscado = await modelo_usuario.findOne({nombre});

        if( !usuario_buscado ){
            console.log('El usuario no existe');
            const errorResponse = {
            mensaje: 'No existe usuario con ese nombre'
            };

            const xmlError = jsonToXml(errorResponse);

            res.set('Content-Type', 'application/xml');
            return res.status(400).send(xmlError);
        }

        await modelo_usuario.findOneAndDelete({nombre});
        

        console.log('Usuario eliminado');
        const Response = {
            mensaje: 'Usuario eliminado correctamente'
        };

        const xmlResponse = jsonToXml(Response);

        res.set('Content-Type', 'application/xml');
        return res.send(xmlResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = {
            mensaje: 'Error al borrar el registro'
        };

        const xmlError = jsonToXml(errorResponse);

        res.set('Content-Type', 'application/xml');
        return res.send(xmlError);
    }
}

module.exports = {
    Ver_usuarios,
    Crear_usuarios,
    Actualizar_usuarios,
    Borrar_usuarios
}