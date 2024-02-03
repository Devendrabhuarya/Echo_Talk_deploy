const RoomDto = (room) => {
    const ogRoom = {
        id: room._id,
        topic: room.topic,
        roomType: room.roomType,
        ownerId: room.ownerId,
        speakers: room.speakers,
        createdAt: room.createdAt,
        totalClient: room.totalClient
    }
    return ogRoom;
}
module.exports = RoomDto;