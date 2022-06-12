const express = require('express');
const app = express();
const http = require('http');
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3000');
});

io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log("room joined");
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("startGame", (data) => {
        const clients = io.sockets.adapter.rooms.get(data.room);
        const clientDictionary = {};
        clients.forEach((client) => {
            clientDictionary[client] = {
                x: Math.floor(Math.random() * (700 - 100 + 1)) + 100,
                y: Math.floor(Math.random() * (700 - 100 + 1)) + 100,
                direction: Math.floor(Math.random() * (360 - 1 + 1)) + 1,
            }
        });
        io.to(data.room).emit('gameStarted', {clientDictionary});
    });

    socket.on("playerInput", (data) => {
        let inputLeft = data.inputLeft;
        let inputRight = data.inputRight;
        let playerId = data.id;
        io.to(data.room).emit("playerInput", {inputLeft, inputRight, playerId});
    });
});