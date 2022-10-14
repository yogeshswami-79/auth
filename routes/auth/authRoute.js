const route = require("express").Router();
const {validateAccessToken, getAccessToken, getRefreshToken, validateRefreshToken, invalidateRefreshToken} = require('../../util/auth')


// Create new User Route
route.post('/register', (req ,res) => {
    
})

// Login route
route.post('/login', (req ,res) => {
    const uname = req.body.username
    // TODO: find User and Validate

    // Generated Payload
    const user = {
        name:uname,
        accessAllowed:["posts", "profile"]
    };

// get token payload
    const accessToken = getAccessToken(user)
    const refreshToken = getRefreshToken(user);

// response
    res.json({accessToken, refreshToken});
})

// Logout route
route.delete('/logout',invalidateRefreshToken, (req ,res) => {
    res.json({msg:"loggedOut"})
})


// Fetch Data Request
route.get('/get', validateAccessToken, (req, res)=>{
    res.send({msg:"working"})
})

// get Access Token
route.post('/token', validateRefreshToken ,(req ,res) => {
    res.json({accessToken:getAccessToken(res.user)})
})


module.exports = route;