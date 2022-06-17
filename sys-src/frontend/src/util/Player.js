export class Player {
  constructor(
    name,
    id,
    circleColor,
    wallColor,
    positionX,
    positionY,
    directionAngle
  ) {
    this.name = name;
    this.id = id;
    this.size = 5;
    this.directionAngle = directionAngle;
    this.circleColor = circleColor;
    this.lineColor = wallColor;
    this.score = 0;
    this.speed = 100;
    this.isAlive = true;
    this.positionY = positionY;
    this.positionX = positionX;
    this.lastY = positionY;
    this.lastX = positionX;
    this.isDrawing = true;
    this.playerStateBuffer = [];
  }

  //move the player in the direction he is facing with the player speed with the delta time of the game
  move(deltaTime) {
    if (this.isAlive) {
      this.positionX += this.speed * Math.cos(this.directionAngle) * deltaTime;
      this.positionY += this.speed * Math.sin(this.directionAngle) * deltaTime;
    }
  }

  updateDirection(inputLeft, inputRight) {
    if (inputLeft === true) {
      this.directionAngle -= Math.PI / 35;
    }
    if (inputRight === true) {
      this.directionAngle += Math.PI / 35;
    }
  }

  addToPlayerStateBuffer(X, Y, drawing) {
    this.playerStateBuffer.push({
      positionX: X,
      positionY: Y,
      isDrawing: drawing,
    });
  }

  setPlayerState(X, Y, isDrawing) {
    this.positionX = X;
    this.positionY = Y;
    this.isDrawing = isDrawing;
  }
}
