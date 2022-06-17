export class ServerCommunicationHelper {
  constructor(Socket) {
    this.Socket = Socket;
    this.room = "";
  }

  //join the game room
  joinRoom(roomName) {
    this.Socket.emit("join_room", roomName);
    this.room = roomName;
  }

  //send the player input to the server
  sendClientPlayerState(positionX, positionY, isDrawing) {
    let room = this.room;
    this.Socket.emit("playerState", { room, positionX, positionY, isDrawing });
  }

  //start the game
  startGame() {
    let room = this.room;
    this.Socket.emit("startGame", { room });
  }
}
