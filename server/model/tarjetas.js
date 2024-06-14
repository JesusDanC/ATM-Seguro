const { Schema, model, mongoose } = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const TarjetasSchema = Schema({
    numero_cuenta:{
        type: String,
        required: true
    },
    numero_tarjeta:{
        type: Number,
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

TarjetasSchema.plugin(autoIncrement, { inc_field: 'numero_tarjeta' });

TarjetasSchema.method('toJSON', function() {
    const { __v, __id, ...object} = this.toObject();

    object.uid = __id;

    return object;
})

module.exports = model('tarjeta', TarjetasSchema);