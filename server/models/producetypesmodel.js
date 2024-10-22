const { Schema, model } = require('mongoose');

const ProduceTypesSchema = new Schema({
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