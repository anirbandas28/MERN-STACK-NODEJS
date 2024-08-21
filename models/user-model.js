const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
        
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    active_status:{
        type: Boolean,
        default: true,
        enum: [true, false]
    },
    delete_status:{
        type: Boolean,
        default: false,
        enum: [true, false]
    }
},
{
    timestamps: true,
    versionKey: false
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // Sign Up Purpose
}

userSchema.methods.compareHash = function(password, confirmPassword) { //login purpose
    return bcrypt.compareSync(password, confirmPassword, null);
}

module.exports = mongoose.model('users2', userSchema);