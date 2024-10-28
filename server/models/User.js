const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');
const Currentproduce = require('./currentproduce');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
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
    currentitems: [Currentproduce.CurrentProduceSchema],
    currentproduce: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currentproduce"
        }
    ],
    produceLocation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location"
        }
    ]
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