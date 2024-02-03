const crypto = require('crypto');

const hashOtp = async (data) => {
    try {
        const hashData = await crypto.createHmac('sha256', process.env.secrete_key)
            .update(data)
            .digest('hex');
        return hashData;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { hashOtp };