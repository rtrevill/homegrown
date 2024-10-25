const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const ProduceTypesSchema = new mongoose.Schema({
    produce: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
});

const ProduceTypes = model('ProduceTypes', ProduceTypesSchema);

module.exports = ProduceTypes;