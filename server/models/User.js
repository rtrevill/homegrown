const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
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
    location: {
        type: String,
    }
})

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