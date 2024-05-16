const { Schema, model } = require('mongoose');

const CuentaSchema = Schema({
    id_usuario:{
        type: String,
        required: true
    },
    numero_cuenta:{
        type: Number,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    saldo:{
        type: Number,
        default:'0'
    },
    fecha_creacion:{
        type: Date,
        required: true
    },
    fecha_suspendido:{
        type: String
    },
});

CuentaSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('cuenta', CuentaSchema);