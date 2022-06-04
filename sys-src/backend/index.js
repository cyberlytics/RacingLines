const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require('mongoose');
const Score = require('./models/score')

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});

//connect to mongodb
const dbURI = 'mongodb+srv://rluser:***REMOVED***@cluster0.vehm5.mongodb.net/RacingLinesDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('This is the Express Server!')
})

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get('/add-score', (req, res) => {
    const score = new Score({
        roomID: 'new scoreID',
        playerID: 'new playerID',
        score: 20
    });

    score.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-scores', (req, res) => {
    Score.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-score', (req, res) => {
    Score.findById('62925edd58c810164db79158')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

io.on("connection", (socket) =>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});