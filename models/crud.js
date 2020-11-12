const { Schema, model } = require('mongoose');

const CrudSchema = Schema({
    nombreCompleto: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    salario: {
        type: Number,
        required: true,
    },
});

module.exports = model('Crud', CrudSchema);