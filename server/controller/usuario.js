const { response } = require('express'); 
const bcrypt = require('bcryptjs');
const convert = require('xml-js');

const modelo_usuario = require('../model/usuario');

const Ver_usuarios = async(req, res) => {
    try {
        const usuarios = await modelo_usuario.find({}, 'nombre role');

        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_usuarios = async(req, res) => {
    const Datos = req.body.usuario;

    const usuario = {
        nombre: Datos.nombre.toString(),
        pin: Datos.pin.toString()
    }

    try {
        const Existe_usuario = await modelo_usuario.findOne({usuario: usuario.nombre});

        if (Existe_usuario) {
            console.log('Usuario ya existe');
            return res.status(200).json({
                ok: false,
                msg: 'El nombre de usuario ya existe'
            });
        }
        
        const usuarios = new modelo_usuario( usuario );

        const salt = bcrypt.genSaltSync(10);
        usuarios.pin = bcrypt.hashSync(usuario.pin, salt);
        
        await usuarios.save();

        console.log('Usuario agregado');
        res.status(200).json({
            ok: false,
            msg: 'Usuario agregado correctamente'
        });

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
            return res.status(404).json({
                ok:false,
                msg: 'El nombre del usuario no existe'
            });
        }
        
        const Datos = req.body.usuario;

        const usuario = {
            nombre: Datos.nombre.toString(),
            pin: Datos.pin.toString()
        }

        if (usuario_buscado.nombre === usuario.nombre) {
            delete usuario.nombre;
        } else {
            const existe_nombre = await modelo_usuario.findOne({ nombre: usuario.nombre });
            if (existe_nombre) {
                console.log('Ese nombre existe');
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese nombre"
                });
            }
        }

        const encriptar = bcrypt.genSaltSync(10);
        usuario.pin = bcrypt.hashSync(usuario.pin, encriptar);

        const usuarioActualizado = await modelo_usuario.findOneAndUpdate({nombre}, usuario, { new: true });

        console.log('Usuario actualizado');
        res.json({
            ok:true,
            msg: "Usuario actualizado correctamente",
            modelo_usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        })
    }
}

const Borrar_usuarios = async (req, res = response) => {
    const nombre = req.params.id;
    
    try {
        const usuario_buscado = await modelo_usuario.findOne({nombre});

        if( !usuario_buscado ){
            console.log('El usuario no existe');
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese nombre'
            });
        }

        await modelo_usuario.findOneAndDelete({nombre});
        

        console.log('Usuario eliminado');
        res.json({
            ok: true, 
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el registro'
        });
    }
}

module.exports = {
    Ver_usuarios,
    Crear_usuarios,
    Actualizar_usuarios,
    Borrar_usuarios
}