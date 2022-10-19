const route = require("express").Router();
const {validateAccessToken, getAccessToken, getRefreshToken, validateRefreshToken, invalidateRefreshToken} = require('../../util/auth')
const {createUser, getUserByEmail} = require('../../util/database')

// Create new User Route
route.post('/register', (req ,res) => {
    createUser({
        username:'yogesh',
        email:'yogeshswami79@gmail.com',
        salt:'ahs',
        hash:'ajshf'
    }, (u)=>console.log(u), (e) => console.log('err', e))

    res.send("done")
})

// Login route
route.post('/login', (req ,res) => {
    const email = req.body.email
    // TODO: find User and Validate
    getUserByEmail(email, (user) => {
        if(!user){
            return res.sendStatus(404)
        }
        // Generated Payload
        user.accessAllowed = ["posts", "profile"]
        console.log(user)
        
        // get token payload
        const accessToken = getAccessToken(user)
        const refreshToken = getRefreshToken(user);

        res.json({accessToken, refreshToken});

    }, (err) => {
        console.log('error',err)
        res.sendStatus(404)
    })    
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