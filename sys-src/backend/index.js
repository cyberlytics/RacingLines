const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Score = require("./models/score");
const Poisson = require("poisson-disk-sampling");
require("dotenv").config();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.IPAddress + ":3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("Server is running on " + process.env.IPAddress + ":3001");
});

//connect to mongodb
const dbURI =
  "mongodb+srv://rluser:RacingLines123@cluster0.vehm5.mongodb.net/RacingLinesDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("This is the Express Server!");
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/add-score", (req, res) => {
  const score = new Score({
    roomID: "new scoreID",
    playerID: "new playerID",
    score: 20,
  });

  score
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-scores", (req, res) => {
  Score.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-score", (req, res) => {
  Score.findById("62925edd58c810164db79158")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

let players = {};

io.on("connection", (socket) => {
  socket.on("join_lobby", (data) => {
    socket.join(data.room);
    players[socket.id] = {
      Id: socket.id,
      Name: "player",
      PlayerColor: "green",
      LineColor: "black",
      CanvasSize: "medium",
      GameTempo: "normal",
    };

    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};

    console.log(clients);
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = players[client];
      });
    }
    socket.emit("onPlayerJoin", { joinedPlayers });
    socket.in(data.room).emit("onPlayerJoin", { joinedPlayers });
  });

  socket.on("playerNameChanged", (data) => {
    console.log(data.playerList.Name);
    players[socket.id].Name = data.playerList[socket.id].Name;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = players[client];
      });
    }
    socket.in(data.room).emit("onPlayerNameChanged", { joinedPlayers });
  });

  socket.on("playerColorChanged", (data) => {
    console.log(data.playerList.PlayerColor);
    players[socket.id].PlayerColor = data.playerList[socket.id].PlayerColor;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = players[client];
      });
    }
    socket.in(data.room).emit("onPlayerColorChanged", { joinedPlayers });
  });

  socket.on("gameTempoChanged", (data) => {
    console.log(data.playerList.GameTempo);
    players[socket.id].GameTempo = data.playerList[socket.id].GameTempo;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = players[client];
      });
    }
    socket.in(data.room).emit("onPlayerColorChanged", { joinedPlayers });
  });

  socket.on("canvasSizeChanged", (data) => {
    console.log(data.playerList.CanvasSize);
    players[socket.id].CanvasSize = data.playerList[socket.id].CanvasSize;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = players[client];
      });
    }
    socket.in(data.room).emit("onCanvasSizeChanged", { joinedPlayers });
  });

  socket.on("join_room", (data) => {
    console.log("room joined");
    socket.join(data);
  });

  socket.on("startGame", (data) => {
    const clients = io.sockets.adapter.rooms.get(data.room);
    const clientDictionary = {};
    let minDist = 300;
    let p = new Poisson({
      shape: [600, 600],
      minDistance: minDist,
      tries: 10,
    });
    while (p.fill().length < clients.size) {
      p = new Poisson({
        shape: [600, 600],
        minDistance: minDist,
        tries: 10,
      });
      minDist -= 10;
    }
    console.log(clients.size + " " + p.fill().length);
    console.log(p.fill());
    let counter = 0;
    clients.forEach((client) => {
      let xposition = p.fill()[counter][0] + 100;
      let yposition = p.fill()[counter][1] + 100;
      console.log(
        "x: " +
          (p.fill()[counter][0] + 100) +
          "y: " +
          (p.fill()[counter][1] + 100)
      );
      clientDictionary[client] = {
        x: xposition,
        y: yposition,
        direction: Math.floor(Math.random() * (360 - 1 + 1)) + 1,
      };
      counter += 1;
    });
    io.to(data.room).emit("gameStarted", { clientDictionary });
  });

  socket.on("playerState", (data) => {
    let positionX = data.positionX;
    let positionY = data.positionY;
    let isDrawing = data.isDrawing;
    let playerId = socket.id;
    io.to(data.room).emit("newPlayerState", {
      positionX,
      positionY,
      isDrawing,
      playerId,
    });
  });
});
