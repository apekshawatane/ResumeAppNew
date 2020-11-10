const {sign} = require('jsonwebtoken');

const createAccessToken = userName => {
    return sign({userName}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10s',
    })
};

const createRefreshToken = userName => {
    return sign({userName}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
};

const sendAccessToken = (req, res, accesstoken) => {
    res.send({
        accesstoken,
        userName: req.body.userName,
    })
};

const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token'
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}