const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const CurrentProduceSchema = new mongoose.Schema({
    itemtype: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    itemproduce: {
        type: String,
        required: true
    },
    itemvariant: {
        type: String,
        required: true
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