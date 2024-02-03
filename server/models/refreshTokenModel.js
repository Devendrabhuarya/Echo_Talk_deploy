const mongoose = require('mongoose');

const refeshToken = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Refreshtoken', refeshToken);