const crypto = require('crypto');
const otpService = require('../service/otpService');
const hashService = require('../service/hashService');
const userService = require('../service/userService');
const tokenService = require('../service/tokenService');
const User = require('../models/userModel');
const { userInfo } = require('os');



const sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const otp = await otpService.genrateOtp();
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = await hashService.hashOtp(data);
        // await otpService.sendBySms(phone, otp);
        res.send({
            success: true,
            hash: `${hash}.${expires}`,
            phone: phone,
            otp,
            message: 'success fully send OTP'
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { phone, hash, otp } = req.body;
        if (!phone || !otp || !hash) {
            return res.send({
                success: false,
                message: "please fill all filed"
            });
        }
        const [hashOTP, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return res.send({
                success: false,
                message: "OTP expired"
            });
        }
        const data = `${phone}.${otp}.${expires}`;
        const isValid = await otpService.verifyOTP(data, hashOTP);
        if (!isValid) {
            return res.send({
                success: false,
                message: "Invalid OTP"
            });
        }
        let user = await userService.findUser({ phone: phone });
        if (!user) {
            user = await new User({
                phone: phone,
                activated: false
            });
            user.save().then(() => console.log('saved'));
        }

        const { refreshToken, accessToken } = await tokenService.genrateToken({
            _id: user._id,
            activated: false
        });
        await tokenService.storeRefreshToken(refreshToken, user._id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: false
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: false
        })
        res.send({
            success: true,
            user,
            accessToken
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
}

const refresh = async (req, res) => {

    const { refreshToken: refreshTokenFromCookies } = req.cookies;
    if (!refreshTokenFromCookies)
        return res.send({
            success: false,
            user: null
        });
    else {
        let userData;
        try {
            userData = await tokenService.refreshAccessToken(refreshTokenFromCookies);
        } catch (error) {

            return res.send({
                success: false,
                message: "Invalid Token refresh token"
            });
        }

        // check token in DB
        try {

            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookies);
            if (!token) {
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                return res.send({
                    success: false,
                    message: "Invalid Token not find refresh Token",
                    token,

                });

            }

        } catch (error) {
            return res.send({
                success: false,
                message: "Internal Error"
            });
        }

        let user;
        try {
            user = await userService.findUser({ _id: userData._id });
            if (!user)
                return res.send({
                    success: false,
                    message: "No User Found"
                });
        } catch (error) {
            return res.send({
                success: false,
                message: "Internal Error"
            });
        }
        const { refreshToken, accessToken } = await tokenService.genrateToken({
            _id: user._id
        });
        try {
            await tokenService.updateRefreshToken(user._id, refreshToken);
        } catch (error) {
            return res.send({
                success: false,
                message: "Internal Error"
            });
        }
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
           httpOnly: false
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
           httpOnly: false
        })
        return res.send({
            success: true,
            user,
            auth: true,
            message: "success fully update token"
        });
    }
}

const logOutUser = async (req, res) => {
    try {

        const { refreshToken } = req.cookies;
        await tokenService.deleteRefreshToken({ refreshToken: refreshToken });
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.send({
            success: true,
            user: null,
            auth: false,
            message: "success fully LogOut"
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }

}

module.exports = { sendOtp, verifyOtp, refresh, logOutUser };
