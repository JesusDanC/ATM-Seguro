const { Schema, model } = require('mongoose');

const TransaccionesSchema = Schema({
    numero_cuenta_envia:{
        type: String
    },
    numero_cuenta_recibe:{
        type: String
    },
    numero_transaccion:{
        type: Number,
        required: true,
        unique: true
    },
    fecha_de_valor:{
        type: Date,
        required: true
    },
    monto:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String
    }
});

TransaccionesSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('transacciones', TransaccionesSchema);