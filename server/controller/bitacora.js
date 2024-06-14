const { response } = require('express');

const modelo_bitacora = require('../model/bitacora');

const Ver_bitacora = async(req, res) => {
    try {
        const bitacora = await modelo_bitacora.find({}, 'codigo fecha_ingreso fecha_salida');

        res.json(bitacora);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_bitacora = async(req, res) => {
    const nombre_usuario = req.params.id;

    try {
        const bitacora = new modelo_bitacora( req.body );
        bitacora.nombre_usuario = nombre_usuario;
        bitacora.fecha_ingreso = Date.now();

        await bitacora.save();

        res.status(200).json({
            ok: true,
            bitacora
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_bitacora = async ( req, res = response) => {
    var codigo = req.params.id;

    try {
        const bitacora_buscada = await modelo_bitacora.findOne({codigo});

        if( !bitacora_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una bitacora con ese codigo'
            });
        }
        
        const campos = req.body;
        
        if(bitacora_buscada==campos.codigo){
            return res.status(404).json({
                ok:false,
                msg: 'El codigo de bitacora ya existe'
            });
        }

        const BitacoraActualizada = await modelo_bitacora.findOneAndUpdate({codigo}, campos, { new: true });
        res.json({
            ok:true,
            modelo_bitacora: BitacoraActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_bitacora = async (req, res = response) => {
    var codigo = req.params.id;
    
    try {
        const bitacora_buscada = await modelo_bitacora.findOne({codigo});

        if( !bitacora_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una bitacora con ese codigo'
            });
        }

        await modelo_bitacora.findOneAndDelete({codigo});
        
        res.json({
            ok: true, 
            msg: 'Bitacora eliminada correctamente'
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
    Ver_bitacora,
    Crear_bitacora,
    Actualizar_bitacora,
    Borrar_bitacora
}