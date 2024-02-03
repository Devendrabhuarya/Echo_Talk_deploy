const tokenService = require('../service/tokenService');

module.exports = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken)
            throw new Error('Invalid Token');
        const userData = await tokenService.verifyAccessToken(accessToken);

        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        })
    }
}