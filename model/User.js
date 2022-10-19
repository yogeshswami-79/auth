const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    email:{
        required:true,
        type:String,
        unique:true,
        index:true,
    },
    salt:{
        type:String,
        required:false,
    },
    hash:{
        type:String,
        required:false,
    }
},{ timestamps: true })


const User = mongoose.model('users',userSchema)

module.exports = User;