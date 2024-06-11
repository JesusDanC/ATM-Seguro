const { response } = require('express');

const modelo_cuenta = require('../model/cuentas');

const Ver_cuentas = async(req, res) => {
    const nombre_usuario = req.params.id;
    try {
        const cuentas = await modelo_cuenta.find({nombre_usuario}, 'numero_cuenta nombre_usuario saldo fecha_creacion');

        res.json(cuentas);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_cuentas = async(req, res) => {
    const nombre_usuario = req.params.id;

    try {
        const cuentas = new modelo_cuenta( req.body );
        cuentas.nombre_usuario = nombre_usuario;

        var fechaActual = Date.now();
        var fecha = new Date(fechaActual);
        fecha.setHours(0, 0, 0, 0);

        cuentas.fecha_creacion = fecha;
        await cuentas.save();

        res.status(200).json({
            ok: true,
            cuentas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_cuentas = async ( req, res = response) => {
    const numero_cuenta = req.params.id;

    try {
        const cuenta_buscada = await modelo_cuenta.findOne({numero_cuenta});

        if( !cuenta_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una cuenta con ese numero'
            });
        }
        
        const campos = req.body;
        
        if(cuenta_buscada==campos.numero_cuenta){
            return res.status(404).json({
                ok:false,
                msg: 'El numero de cuenta existe'
            });
        }

        const CuentaActualizada = await modelo_cuenta.findOneAndUpdate({numero_cuenta}, campos, { new: true });
        res.json({
            ok:true,
            modelo_cuenta: CuentaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_cuentas = async (req, res = response) => {
    var numero_cuenta = req.params.id;
    
    try {
        const cuenta_buscada = await modelo_cuenta.findOne({numero_cuenta});

        if( !cuenta_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una cuenta con ese numero'
            });
        }

        await modelo_cuenta.findOneAndDelete({numero_cuenta});
        
        res.json({
            ok: true, 
            msg: 'Cuenta eliminada correctamente'
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
    Ver_cuentas,
    Crear_cuentas,
    Actualizar_cuentas,
    Borrar_cuentas
}