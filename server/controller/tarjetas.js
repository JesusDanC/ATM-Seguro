const { response } = require('express');

const modelo_tarjeta = require('../model/tarjetas');

const Ver_tarjetas = async(req, res) => {
    const id_cuenta = req.params.id;
    try {
        const tarjetas = await modelo_tarjeta.find({id_cuenta}, 'numero_tarjeta cvv fecha_vencimiento');

        res.json(tarjetas);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_tarjetas = async(req, res) => {
    const id_cuenta = req.params.id;
    const {numero_tarjeta} = req.body;

    try {
        const Existe_tarjeta = await modelo_tarjeta.findOne({numero_tarjeta});

        if (Existe_tarjeta) {
            return res.status(200).json({
                ok: false,
                msg: 'El numero de tarjeta ya existe'
            });
        }
        const tarjetas = new modelo_tarjeta( req.body );
        tarjetas.id_cuenta = id_cuenta;

        var fechaActual = Date.now();
        const fecha = new Date(fechaActual), fecha_venc = new Date(fechaActual);
        fecha.setHours(0, 0, 0, 0);
        fecha_venc.setHours(0, 0, 0, 0);

        tarjetas.fecha_creacion = fecha;
       
        fecha_venc.setFullYear(fecha.getFullYear() + 2);

        tarjetas.fecha_vencimiento = fecha_venc;

        await tarjetas.save();

        res.status(200).json({
            ok: true,
            tarjetas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_tarjetas = async ( req, res = response) => {
    var numero_tarjeta = req.params.id;

    try {
        const tarjeta_buscada = await modelo_tarjeta.findOne({numero_tarjeta});

        if( !tarjeta_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una tarjeta con ese numero'
            });
        }
        
        const campos = req.body;
        
        if(tarjeta_buscada==campos.numero_tarjeta){
            return res.status(404).json({
                ok:false,
                msg: 'El numero de tarjeta existe'
            });
        }

        const TarjetaActualizada = await modelo_tarjeta.findOneAndUpdate({numero_tarjeta}, campos, { new: true });
        res.json({
            ok:true,
            modelo_tarjeta: TarjetaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_tarjetas = async (req, res = response) => {
    var numero_tarjeta = req.params.id;
    
    try {
        const tarjeta_buscada = await modelo_tarjeta.findOne({numero_tarjeta});

        if( !tarjeta_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una tarjeta con ese numero'
            });
        }

        await modelo_tarjeta.findOneAndDelete({numero_tarjeta});
        
        res.json({
            ok: true, 
            msg: 'Tarjeta eliminada correctamente'
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
    Ver_tarjetas,
    Crear_tarjetas,
    Actualizar_tarjetas,
    Borrar_tarjetas
}