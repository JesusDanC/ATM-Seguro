const { Schema, model } = require('mongoose');

const TarjetasSchema = Schema({
    id_cuenta:{
        type: String,
        required: true
    },
    numero_tarjeta:{
        type: Number,
        required: true,
        unique: true
    },
    cvv:{
        type: Number,
        required: true
    },
    fecha_vencimiento:{
        type: Date,
        required: true
    },
    fecha_creacion:{
        type: Date,
        required: true
    }
});

TarjetasSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('tarjeta', TarjetasSchema);