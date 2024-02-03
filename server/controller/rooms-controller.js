const roomService = require('../service/roomService');
const RoomDto = require('../dto/room-dto');

const create = async (req, res) => {
    try {
        const { topic, roomType } = req.body;
        const Room = await roomService.createRoom({
            topic, roomType,
            ownerId: req.user._id,

        });
        return res.send({
            success: true,
            room: RoomDto(Room)
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
}

const index = async (req, res) => {
    try {
        const Rooms = await roomService.getAllRoom(['open']);
        const allRoom = Rooms.map((room) => RoomDto(room));
        return res.send({
            success: true,
            allRoom
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
}

const show = async (req, res) => {
    try {
        const Room = await roomService.getRoom(req.params.roomId);
        const room = RoomDto(Room);
        return res.send({
            success: true,
            room
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
}

module.exports = { create, index, show };