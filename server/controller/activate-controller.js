const Jimp = require("jimp");
const path = require('path')
const userService = require('../service/userService');
const User = require('../models/userModel');

const activate = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user._id;
        const update = { activated: true, name: name, avatar: req.file.filename };
        const user = await User.findOneAndUpdate({ _id: userId }, update, { new: true });
      
        res.send({
            success: true,
            user: user,
            message: "success fully saved"
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: error.message
        });
    }
}

module.exports = { activate };