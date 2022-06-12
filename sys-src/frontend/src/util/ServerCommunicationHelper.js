export class ServerCommunicationHelper{
    constructor(Socket) {
        this.Socket = Socket;
        this.room = "";
    }

    //join the game room
    joinRoom(roomName){
        this.Socket.emit('join_room', roomName);
        this.room = roomName;
    }

    //send the player input to the server
    sendInput(inputLeft, inputRight, id) {
        let room = this.room;
        this.Socket.emit('playerInput', { room ,inputLeft,inputRight, id});
    }

    //start the game
    startGame() {
        let room = this.room;
        this.Socket.emit('startGame', {room});
    }
}
