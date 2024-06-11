const { Schema, model, mongoose } = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const TransaccionesSchema = Schema({
    numero_transaccion:{
        type: Number,
        unique: true
    },
    numero_cuenta_envia:{
        type: String
    },
    numero_cuenta_recibe:{
        type: String
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

TransaccionesSchema.plugin(autoIncrement, { inc_field: 'numero_transaccion' });

TransaccionesSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('transacciones', TransaccionesSchema);