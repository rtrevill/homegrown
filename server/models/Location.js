const { Schema, model } = require('mongoose');


const locationSchema = new Schema({
    locationtype: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    locationId: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
});

const Location = model('Location', locationSchema);

module.exports = Location;
