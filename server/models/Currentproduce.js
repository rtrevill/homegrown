const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const CurrentProduceSchema = new Schema({
    producetype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduceTypes'
    },
    itemdetail: {
        type: String,
        required: false,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
});

const Currentproduce = model('Currentproduce', CurrentProduceSchema);

module.exports = {Currentproduce, CurrentProduceSchema};