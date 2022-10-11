const jwt = require('jsonwebtoken')

function getAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401)

    jwt
        .verify(token, process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) return res.sendStatus(403)

                res.user = user
                next()
            })

}

module.exports = authenticateToken;
module.exports = getAccessToken;