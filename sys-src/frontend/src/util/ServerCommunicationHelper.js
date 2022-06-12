import {Socket} from "socket.io-client";
export class ServerCommunicationHelper{
    constructor(Socket) {
        this.Socket = Socket;
        this.room = "";
    }

    //join the game room
    joinRoom(roomName){
        this.Socket.emit('joinRoom', roomName);
        this.room = roomName;
    }

    //send the player input to the server
    sendInput(input) {
        this.Socket.to(this.room).emit('playerInput', input);
    }

    //start the game
    startGame() {
        this.Socket.emit('startGame', this.room);
    }
}
