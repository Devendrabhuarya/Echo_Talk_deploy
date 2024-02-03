const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshTokenModel');
const accessTokenSecret = process.env.accessTokenSecret;
const refrshTokenSecret = process.env.refreshTokenSecret;

const genrateToken = async (payload) => {
    try {
        const accessToken = await jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m'
        });
        const refreshToken = await jwt.sign(payload, refrshTokenSecret, {
            expiresIn: '1y'
        });
        return { refreshToken, accessToken };
    } catch (error) {
        console.log(error);
    }
};


const storeRefreshToken = async (refreshToken, userId) => {
    try {
        const token = new RefreshToken({
            refreshToken, userId
        });
        token.save();
    } catch (error) {
        console.log(error);
    }
}

const verifyAccessToken = async (token) => {
    return jwt.verify(token, accessTokenSecret)
}
const refreshAccessToken = async (token) => {
    try {
        return jwt.verify(token, refrshTokenSecret)
    } catch (error) {
        console.log(error);
    }
}


const findRefreshToken = async (id, token) => {
    try {
        return await RefreshToken.findOne({ userId: id, refreshToken: token });
    } catch (error) {

    }
}


const updateRefreshToken = async (id, token) => {
    try {
        return await RefreshToken.updateOne({ userId: id }, { $set: { refreshToken: token } });

        // return await RefreshToken.updateOne({ userId: id }, { refreshToken: token });
    } catch (error) {
        console.log(error);
    }
}

const deleteRefreshToken = async (filter) => {
    try {
        return await RefreshToken.deleteOne(filter);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    genrateToken, storeRefreshToken,
    verifyAccessToken, refreshAccessToken,
    findRefreshToken, updateRefreshToken,
    deleteRefreshToken
};