const { Schema, model, default: mongoose } = require('mongoose');


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
    longlat: {
        type: [Number],
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Location = model('Location', locationSchema);

module.exports = Location;
