const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');
const Currentproduce = require('./currentproduce');

const defaultLocationSchema = new Schema({
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
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true
    },
    clearance: {
        type: Number,
        required: true
    },
    location: [defaultLocationSchema],
    currentitems: [Currentproduce.CurrentProduceSchema]
});

userSchema.pre('save', async function (next){
    if (this.isNew || this.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10);
        this.password = bcryptjs.hashSync(this.password, salt);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcryptjs.compareSync(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;