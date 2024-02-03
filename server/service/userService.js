const User = require('../models/userModel');

const findUser = async (filter) => {
    try {
        const user = await User.findOne(filter);
        return user;
    } catch (error) {
        console.log(error);
    }
}

const editUser = async (id, data) => {
    try {
        const user = await User.findByIdAndUpdate(id, { $set: { ...data } });
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findUser, editUser };