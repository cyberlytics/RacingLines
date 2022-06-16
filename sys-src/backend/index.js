const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
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

let players = {};

io.on("connection", (socket) =>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room", (data) =>{
        console.log("data");
    //     socket.join(data);
    //     console.log(`User Joined : ${socket.id}`);
    //     players[socket.id] = {"Id":socket.id, "Name":"player1", "PlayerColor":"black", "LineColor":"black"};
    //     const clients = io.sockets.adapter.rooms.get(data.room);
    //     joinedPlayers = {};
    //     clients.forEach((client) => {
    //         if(client.id!==socket.id){
    //             joinedPlayers[client.id] = players[client.id]
    //             console.log(joinedPlayers[client.id]);
    // }});
    // console.log("joinedPlayers[client.id]");
    //     socket.emit("joined_players",{joinedPlayers});
        });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("changeName", (data) => {
        players[socket.id].Name = data.Name;
        socket.to(data.room).emit("nameChanged", {"players": players[socket.id].Name, "id": socket.id});
    });
});