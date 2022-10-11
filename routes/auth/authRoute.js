const route = require("express").Router();
const jwt = require('jsonwebtoken')
const authenticateToken = require('../../util/auth')
const getAccessToken = require('../../util/auth')
// const bcrypt = require('bcrypt')

route.post('/register', (req ,res) => {
    
})

route.post('/login', (req ,res) => {
    const uname = req.body.username
    const user = {name:uname};

    const accessToken = getAccessToken(user)

    res.json({accessToken});
})

route.post('/logout', (req ,res) => {
    res.json({msg:"allowed"})
})

route.get('/get', authenticateToken, (req, res)=>{
    res.send({msg:"working"})
})

route.post('/token', (req ,res) => {

})


module.exports = route;