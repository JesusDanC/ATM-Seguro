const { Schema, model, mongoose } = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const ServicioSchema = Schema({
    id_servicio:{
        type: Number,
        unique: true
    },
    nombre_usuario:{
        type: String,
        required: true
    },
    nombre_servicio:{
        type: String,
        required: true
    },
    numero_cuenta_usuario:{
        type: Number,
        required: true
    },
    fecha_pago:{
        type: Date,
        required: true
    },
    monto:{
        type: Number,
        default:'0'
    }
});

ServicioSchema.plugin(autoIncrement, { inc_field: 'id_servicio' });

ServicioSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('servicio', ServicioSchema);