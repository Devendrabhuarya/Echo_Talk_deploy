const crypto = require('crypto');
const hashService = require('../service/hashService');

const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;
const twilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});


const genrateOtp = async () => {
    try {
        const otp = await crypto.randomInt(1000, 9999);
        console.log(otp);
        return otp;
    } catch (error) {
        console.log(error);
    }
}

const verifyOTP = async (data, hash) => {
    try {
        const hashData = await hashService.hashOtp(data);
        return hashData === hash;
    } catch (error) {
        console.log(error);
    }
}

const sendBySms = async (phone, otp) => {

    try {
        await twilio.messages
            .create({
                from: '+13344589183',
                to: phone,
                body: `Your Echo_Talk OTP is ${otp}`
            })
            .then(message => console.log('success fully send otp'));
    } catch (error) {

    }
}

module.exports = { genrateOtp, sendBySms, verifyOTP };