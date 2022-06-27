export class ServerCommunicationHelper {
  constructor(Socket) {
    this.Socket = Socket;
    this.room = "";
  }

  setRoom(room)
  {
    this.room = room;
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
