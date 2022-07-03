export class Player {
    constructor(
        name,
        id,
        circleColor,
        wallColor,
        positionX,
        positionY,
        directionAngle,
        score= 0
    ) {
        this.name = name;
        this.id = id;
        this.size = 11;
        this.directionAngle = directionAngle;
        this.circleColor = circleColor;
        this.lineColor = wallColor;
        this.score = score;
        this.speed = 100;
        this.isAlive = true;
        this.positionY = positionY;
        this.positionX = positionX;
        this.lastY = positionY;
        this.lastX = positionX;
        this.isDrawing = true;
        this.playerStateBuffer = [];
        this.callbacks = [];
    }

    //move the player in the direction he is facing with the player speed with the delta time of the game
    move(deltaTime) {
        if (this.isAlive) {
            this.lastY = this.positionY;
            this.lastX = this.positionX;
            this.positionX +=
                this.speed * Math.cos(this.directionAngle) * deltaTime;
            this.positionY +=
                this.speed * Math.sin(this.directionAngle) * deltaTime;
        }
    }
    updateDirection(inputLeft, inputRight) {
        if (inputLeft === true) {
            this.directionAngle -= Math.PI / 70;
        }
        if (inputRight === true) {
            this.directionAngle += Math.PI / 70;
        }
    }
    addToPlayerStateBuffer(X, Y, drawing, isAlive) {
        this.playerStateBuffer.push({
            positionX: X,
            positionY: Y,
            isDrawing: drawing,
            isAlive: isAlive
        });
    }

    setPlayerState(X, Y, isDrawing, isAlive) {
        this.lastY = this.positionY;
        this.lastX = this.positionX;
        this.positionX = X;
        this.positionY = Y;
        this.isDrawing = isDrawing;
        this.isAlive = isAlive;
    }

    // Count up the score for players who are still alive
    addScore(value) {
        console.log("Adding Score to "+this.name+". +"+value+" Points");
        if (this.isAlive) {
            this.score += value;
            this.updateObservers();
        }
    }

    // Add observers to the observers list
    subscribe(callback) {
        this.callbacks.push(callback);
    }

    // Remove observers from the observers list
    unsubscribe(callback) {
        this.callbacks = this.callbacks.filter((item) => item !== callback);
    }

    // Notify all observers whenever a specific event occurs
    updateObservers() {
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i](this); // this = player object
        }
    }
}
