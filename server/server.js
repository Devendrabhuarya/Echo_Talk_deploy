require('dotenv').config();
const express = require('express');
const dbConfig = require('./config/dbConfig');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ACTIONS = require('./actions');
const roomService = require('./service/roomService');
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const server = require('http').createServer(app);
const corsOptions = {
    origin: "https://echo-talk-devendra-arun-vt.onrender.com", // frontend URI (ReactJS)
     credentials: true
}
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://echo-talk-devendra-arun-vt.onrender.com',
        methods: ['GET', 'POST']
    }
})
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: '8mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  // Set the origin to the exact client origin
  res.header("Access-Control-Allow-Origin", "https://echo-talk-devendra-arun-vt.onrender.com");
  // Allow credentials for cross-origin requests
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const otpRoutes = require('./routes/otpRoute');

app.use('/api/users', otpRoutes);

app.get('/', (req, res) => {
    res.send('Hello World from devendra');
})
const port = process.env.PORT || 3001;

const scoketUserMapping = {

}

io.on('connection', (socket) => {
    console.log('new Connection', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        scoketUserMapping[socket.id] = user;

        //new map
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id, createOffer: false, user
            });
            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId, createOffer: true, user: scoketUserMapping[clientId]
            });
        });
        roomService.handleSizeOfTotalRoomClient(roomId, 1);
        roomService.addSpeakers(roomId, user._id);
        socket.join(roomId);

    });

    // Handle relay ice 
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        if (icecandidate) {
            io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
                peerId: socket.id,
                icecandidate
            });
        }

    });

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    // handle Mute and UnMute fuctionality
    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                userId
            });
        });
    });
    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.UNMUTE, {
                userId
            });
        });
    });

    //mute info

    socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {

                io.to(clientId).emit(ACTIONS.MUTE_INFO, {
                    userId,
                    isMute,
                });
            }
        });
    });

    // leaving the room

    const leaveRoom = ({ roomId }) => {

        const { rooms } = socket;
        const userId = scoketUserMapping[socket.id]?._id;
        Array.from(rooms).forEach(roomId => {
            // get clients
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: scoketUserMapping[socket.id]?._id
                });
            });
        
            socket.leave(roomId);
            if (roomId.length >= 24) {

                roomService.handleSizeOfTotalRoomClient(roomId, -1);
                roomService.removeSpeakers(roomId, userId);
            }

        });
        delete scoketUserMapping[socket.id];
    }
    // const leaveRoomWhenDisconnecting = ({ roomId }) => {

    //     const { rooms } = socket;
    //     const userId = scoketUserMapping[socket.id]?._id;
    //     Array.from(rooms).forEach(roomId => {
    //         // get clients
    //         const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    //         clients.forEach(clientId => {
    //             io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
    //                 peerId: socket.id,
    //                 userId: scoketUserMapping[socket.id]?._id
    //             });
    //         });
    //         console.log(roomId);
    //         roomService.handleSizeOfTotalRoomClient(roomId, -1);
    //         roomService.removeSpeakers(roomId, userId);
    //         socket.leave(roomId);

    //     });
    //     delete scoketUserMapping[socket.id];
    // }
    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);

});
server.listen(port, () => console.log(`running in port ${port}`));
