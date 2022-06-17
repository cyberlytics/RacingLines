export class Player {
    constructor(name, id, circleColor, wallColor, positionX, positionY, directionAngle) {
        this.name = name;
        this.id = id;
        this.size = 6;
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
        this.lastPositions = [];
        this.isDrawing = true;
    }

    //move the player in the direction he is facing with the player speed with the delta time of the game
    move(deltaTime) {
        if(this.isAlive) {
            this.lastY = this.positionY;
            this.lastX = this.positionX;
            this.lastPositions.push({x: this.positionX, y: this.positionY});
            this.positionX += this.speed * Math.cos(this.directionAngle) * deltaTime;
            this.positionY += this.speed * Math.sin(this.directionAngle) * deltaTime;
        }
    }

    updateDirection(rightKeyPressed, leftKeyPressed) {
        if (leftKeyPressed === true) {
            this.directionAngle -= Math.PI /70;
        }
        if (rightKeyPressed === true) {
            this.directionAngle += Math.PI /70;
        }

    }
}