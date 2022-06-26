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
  "mongodb+srv://rluser:***REMOVED***@cluster0.vehm5.mongodb.net/RacingLinesDatabase?retryWrites=true&w=majority";
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
