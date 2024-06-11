const { Schema, model, mongoose } = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const CuentaSchema = Schema({
    nombre_usuario:{
        type: String,
        required: true
    },
    numero_cuenta:{
        type: Number,
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
    }
});

CuentaSchema.plugin(autoIncrement, { inc_field: 'numero_cuenta' });

CuentaSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('cuenta', CuentaSchema);