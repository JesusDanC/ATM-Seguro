const { response } = require('express');

const modelo_servicio = require('../model/servicios');
const modelo_cuenta = require('../model/cuentas');

const Ver_servicios = async(req, res) => {
    const nombre_usuario = req.params.id;
    try {
        const servicios = await modelo_servicio.find({nombre_usuario}, 'id_servicio nombre_servicio numero_cuenta_usuario monto fecha_pago');

        res.json(servicios);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_servicios = async(req, res) => {
    const nombre_usuario = req.params.id;
    const {numero_cuenta_usuario} = req.body;

    try {
        const Existe_cuenta = await modelo_cuenta.findOne({numero_cuenta_usuario});

        if (Existe_cuenta) {
            return res.status(200).json({
                ok: false,
                msg: 'El numero de cuenta no existe'
            });
        }
        const servicios = new modelo_servicio( req.body );
        servicios.nombre_usuario = nombre_usuario;

        var fechaActual = Date.now();
        var fecha = new Date(fechaActual);

        servicios.fecha_pago = fecha;
        await servicios.save();

        res.status(200).json({
            ok: true,
            servicios
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_servicios = async ( req, res = response) => {
    const id_servicio = req.params.id;

    try {
        const servicio_buscado = await modelo_servicio.findOne({id_servicio});

        if( !servicio_buscado ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un servicio con ese nombre'
            });
        }
        
        const campos = req.body;
        
        if(servicio_buscado==campos.id_servicio){
            return res.status(404).json({
                ok:false,
                msg: 'El nombre del servicio ya existe'
            });
        }

        const ServicioActualizado = await modelo_servicio.findOneAndUpdate({id_servicio}, campos, { new: true });
        res.json({
            ok:true,
            modelo_servicio: ServicioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_servicios = async (req, res = response) => {
    var id_servicio = req.params.id;
    
    try {
        const servicio_buscado = await modelo_servicio.findOne({id_servicio});

        if( !servicio_buscado ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un servicio con ese nombre'
            });
        }

        await modelo_servicio.findOneAndDelete({id_servicio});
        
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
    Ver_servicios,
    Crear_servicios,
    Actualizar_servicios,
    Borrar_servicios
}