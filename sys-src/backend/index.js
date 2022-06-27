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
Set.prototype.getByIndex = function(index) { return [...this][index]; }

let lobbys = {};

io.on("connection", (socket) => {
  socket.on("join_lobby", (data) => {
    socket.join(data.room);
    if(!lobbys[data.room]) lobbys[data.room] = {};
    lobbys[data.room][socket.id] = {
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
        joinedPlayers[client] = lobbys[data.room][client];
      });
    }
    socket.emit("onPlayerJoin", { joinedPlayers });
    socket.in(data.room).emit("onPlayerJoin", { joinedPlayers });
  });

  socket.on("playerNameChanged", (data) => {
    console.log(data.playerList.Name);
    lobbys[data.room][socket.id].Name = data.playerList[socket.id].Name;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = lobbys[data.room][client];
      });
    }
    socket.in(data.room).emit("onPlayerNameChanged", { joinedPlayers });
  });

  socket.on("playerColorChanged", (data) => {
    console.log(data.playerList.PlayerColor);
    lobbys[data.room][socket.id].PlayerColor = data.playerList[socket.id].PlayerColor;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = lobbys[data.room][client];
      });
    }
    socket.in(data.room).emit("onPlayerColorChanged", { joinedPlayers });
  });

  socket.on("gameTempoChanged", (data) => {
    console.log(data.playerList.GameTempo);
    lobbys[data.room][socket.id].GameTempo = data.playerList[socket.id].GameTempo;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = lobbys[data.room][client];
      });
    }
    socket.in(data.room).emit("onPlayerColorChanged", { joinedPlayers });
  });

  socket.on("canvasSizeChanged", (data) => {
    console.log(data.playerList.CanvasSize);
    lobbys[data.room][socket.id].CanvasSize = data.playerList[socket.id].CanvasSize;
    const clients = io.sockets.adapter.rooms.get(data.room);
    const joinedPlayers = {};
    if (clients !== undefined) {
      clients.forEach((client) => {
        joinedPlayers[client] = lobbys[data.room][client];
      });
    }
    socket.in(data.room).emit("onCanvasSizeChanged", { joinedPlayers });
  });

  socket.on("clickedPlay", (data) => {
    const timestamp = new Date().getTime() + 3000;
    io.in(data.room).emit("startGame", {'timestamp': timestamp, "players": lobbys[data.room]});

    setTimeout(startCountdown, 250, data.room);
    setTimeout(startGame, 3500, data.room);
  });

  socket.on("startGame", (data) => {
    startGame(data.room);
  });

  function startCountdown(room) {
    if(lobbys[room])
    {
      const clients = io.sockets.adapter.rooms.get(room);
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
        if(lobbys[room][client])
        {
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
            player: lobbys[room][client]
          };
          counter += 1;
        }
      });

      console.log("clientDictionary");
      console.log(clientDictionary);
      io.to(room).emit("startCountdown", { clientDictionary });
    }
  }

  function startGame(room)
  {
    io.to(room).emit("gameStarted", {  });
  }

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

  socket.on("disconnecting", () => {
    clearRoom();
  });

  socket.on("clearRoom", () => {
    clearRoom();
  });

  function  clearRoom()
  {
    let roomId = socket.rooms.getByIndex(1);
    if(lobbys[roomId])
    {
      if(lobbys[roomId][socket.id]) delete lobbys[roomId][socket.id];
      if( Object.keys(lobbys[roomId]).length == 0) {
        delete lobbys[roomId];
      }
    }
    if(roomId) socket.leave(roomId);
  }

});
