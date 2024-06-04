const { Schema, model } = require('mongoose');

const BitacoraSchema = Schema({
    id_usuario:{
        type: String,
        required: true
    },
    fecha_ingreso:{
        type: Date,
        required: true
    },
    fecha_salida:{
        type: Date
    },
    codigo:{
        type: Number,
        required: true,
        unique: true
    }
});

BitacoraSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('bitacora', BitacoraSchema);