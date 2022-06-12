export class Player {
    constructor(name, id, circleColor, wallColor) {
        this.name = name;
        this.id = id;
        this.segmentCount = 0;
        this.size = 5;
        this.directionAngle = 0;
        this.circleColor = circleColor;
        this.lineColor = wallColor;
        this.score = 0;
        this.positionStack = [];
        this.speed = 100;
        this.isAlive = true;
        this.positionY = 400;
        this.positionX = 400;
    }

    //randomize the player starting position
    randomizePlayerStartingPosition(gameSize) {
        this.positionX = Math.floor(Math.random() * (gameSize - 1 + 1)) + 1;
        this.positionY = Math.floor(Math.random() * (gameSize - 1 + 1)) + 1;
    }

    //move the player in the direction he is facing with the player speed with the delta time of the game
    move(deltaTime) {
        if(this.isAlive) {
            this.positionX += this.speed * Math.cos(this.directionAngle ) * deltaTime;
            this.positionY += this.speed * Math.sin(this.directionAngle) * deltaTime;
        }
    }

    updateDirection(rightKeyPressed, leftKeyPressed) {
        if (leftKeyPressed === true) {
            this.directionAngle -= Math.PI / 35;
        }
        if (rightKeyPressed === true) {
            this.directionAngle += Math.PI / 35;
        }

    }
}