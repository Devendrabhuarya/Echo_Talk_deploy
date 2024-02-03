
const userService = require('../service/userService');


const getUser = async (req, res) => {
    try {
        const user = await userService.findUser({ _id: req.params.userId });
        res.send({
            user,
            success: true,
            message: 'success fully get user'
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
}

const editUserProfile = async (req, res) => {
    try {
        console.log(req.body, req.file, req.user);
        let avatar = req.file?.filename, user;
        if (req.file) {
            user = await userService.editUser(req.user._id, { ...req.body, avatar });
        } else {
            user = await userService.editUser(req.user._id, { ...req.body });
        }
        console.log(user);
        res.send({
            user,
            success: true,
            message: 'success fully get user'
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
}

module.exports = { getUser, editUserProfile };