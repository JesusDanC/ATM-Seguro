const { Schema, model, mongoose } = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const BitacoraSchema = Schema({
    nombre_usuario:{
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
        unique: true
    }
});

BitacoraSchema.plugin(autoIncrement, { inc_field: 'codigo' });

BitacoraSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('bitacora', BitacoraSchema);