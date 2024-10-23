const { Schema, model } = require('mongoose');

const CurrentProduceSchema = new Schema({
    itemtype: {
        type: Schema.Types.ObjectId,
        required: true
    },
    itemdetail: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    location: {
        type: Schema.Types.ObjectId,
        required: false
    },
});

const Currentproduce = model('Currentproduce', CurrentProduceSchema);

module.exports = {Currentproduce, CurrentProduceSchema};