const jwt = require('jsonwebtoken')

const validAuthTokens = []

function getAccessToken(user) {
    const accressToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    return accressToken
}

function getRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    validAuthTokens.push(refreshToken)
    return refreshToken
}


function validateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.sendStatus(403)

            res.user = user
            next()
        })
}

// Validate Refresh Token
function validateRefreshToken(req, res, next) {
    const rfToken = req.body.token;

    if (!rfToken) return res.sendStatus(401)
    if (!validAuthTokens.includes(rfToken)) return res.sendStatus(403)


    jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET,
        (err, usr) => {
            if (err) return res.sendStatus(403)
            res.user = {name:usr.name, accessAllowed:usr.accessAllowed};
            next()
        })
}

function invalidateRefreshToken(req, res, next) {
    const refreshToken = req.body.token;

    if(!refreshToken) return res.sendStatus(401)
    
    validAuthTokens.pop(refreshToken);
    
    next()
}

module.exports = { validateAccessToken, invalidateRefreshToken, getRefreshToken, getAccessToken, validateRefreshToken };
