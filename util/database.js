const mongoose = require('mongoose')
const User = require('../model/User')


function isValidEmail(email){
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}


async function dbConnect(url){
    return mongoose.connect(url)
}

async function getUserByEmail(email, onSuccess, onErr){
    if(isValidEmail(email)){
        User.findOne({email:email})
        .then(user=>{
            onSuccess({
                uid:user._id,
                username:user.username,
                email:user.email,
            })
        })
        .catch(e => onErr(e))
    }
}
async function createUser(user, onSuccess, onErr){
    if(user && isValidEmail(user.email)){
        const u = new User(user)
        u.save()
        .then(()=>onSuccess(u))
        .catch(e => onErr(e))
    }
}




module.exports = {dbConnect, getUserByEmail, createUser};