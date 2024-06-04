const { response } = require('express');

const modelo_transacciones = require('../model/transacciones');

const Ver_transacciones = async(req, res) => {
    const numero_cuenta_envia = req.params.id;
    try {
        const transacciones = await modelo_transacciones.find({numero_cuenta_envia}, 'numero_cuenta_recibe numero_transaccion fecha_de_valor monto descripcion');

        res.json(transacciones);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al mostrar datos'
        });
    }
}

const Crear_transacciones = async(req, res) => {
    const numero_cuenta_envia = req.params.id;
    const {numero_transaccion, numero_cuenta_recibe} = req.body;

    try {
        if (numero_cuenta_envia === numero_cuenta_recibe) {
            return res.status(200).json({
                ok: false,
                msg: 'No se puede hacer una transaccion a la misma cuenta'
            });
        }

        const Existe_cuenta = await modelo_transacciones.findOne({numero_cuenta_recibe});

        if (Existe_cuenta) {
            return res.status(200).json({
                ok: false,
                msg: 'La cuenta no existe'
            });
        }

        const Existe_transaccion = await modelo_transacciones.findOne({numero_transaccion});

        if (Existe_transaccion) {
            return res.status(200).json({
                ok: false,
                msg: 'El numero de la transaccion ya existe'
            });
        }

        const transacciones = new modelo_transacciones( req.body );
        transacciones.numero_cuenta_envia = numero_cuenta_envia;

        transacciones.fecha_de_valor = Date.now();
        await transacciones.save();

        res.status(200).json({
            ok: true,
            transacciones
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        });
    }
}

const Actualizar_transacciones = async ( req, res = response) => {
    var numero_transaccion = req.params.id;

    try {
        const transaccion_buscada = await modelo_transacciones.findOne({numero_transaccion});

        if( !transaccion_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una transaccion con ese numero'
            });
        }
        
        const campos = req.body;
        
        if(transaccion_buscada==campos.numero_transaccion){
            return res.status(404).json({
                ok:false,
                msg: 'El numero de transaccion ya existe'
            });
        }

        const TransaccionActualizada = await modelo_transacciones.findOneAndUpdate({numero_transaccion}, campos, { new: true });
        res.json({
            ok:true,
            modelo_transacciones: TransaccionActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado!!!'
        });
    }
}

const Borrar_transacciones = async (req, res = response) => {
    var numero_transaccion = req.params.id;
    
    try {
        const transaccion_buscada = await modelo_transacciones.findOne({numero_transaccion});

        if( !transaccion_buscada ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe una transaccion con ese numero'
            });
        }

        await modelo_transacciones.findOneAndDelete({numero_transaccion});
        
        res.json({
            ok: true, 
            msg: 'Transaccion eliminada correctamente'
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
    Ver_transacciones,
    Crear_transacciones,
    Actualizar_transacciones,
    Borrar_transacciones
}