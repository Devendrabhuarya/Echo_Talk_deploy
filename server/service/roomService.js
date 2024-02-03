const Room = require('../models/roomModel');

const createRoom = async (payload) => {
    const { topic, ownerId, roomType } = payload;
    const room = await new Room({ topic, ownerId, roomType, speakers: [ownerId], });
    room.save();
    return room;
}

const getAllRoom = async (types) => {
    try {
        return await Room.find({ roomType: { $in: types } }).populate('ownerId').populate('speakers');
    } catch (error) {
        console.log(error);
    }
}

const getRoom = async (roomId) => {
    try {
        return await Room.findById(roomId);
    } catch (error) {
        console.log(error);
    }
}


const handleSizeOfTotalRoomClient = async (roomId, type) => {
    try {

        await Room.findByIdAndUpdate(roomId, { $inc: { totalClient: type } });

    } catch (error) {
        console.log(error);
    }
}


const addSpeakers = async (roomId, speakerId) => {
    try {
        await Room.findByIdAndUpdate(roomId, { $push: { speakers: speakerId } });

    } catch (error) {
        console.log(error);
    }
}
const removeSpeakers = async (roomId, speakerId) => {
    try {
        await Room.findByIdAndUpdate(roomId, { $pull: { speakers: speakerId } });
    } catch (error) {

    }
}

module.exports = {
    createRoom, getAllRoom, getRoom,
    handleSizeOfTotalRoomClient, addSpeakers, removeSpeakers
};