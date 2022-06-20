//player class for the game
export default class Player {
    constructor(name, id, circleColor, wallColor) {
        this.name = name;
        this.poistionX = 400;
        this.poistionY = 400;
        this.id = id;
        this.size = 10;
        this.directionAngle = 0;
        this.circleColor = circleColor;
        this.wallColor = wallColor;
        this.score = 0;
        this.positionStack = [];
        this.speed = 2;
        this.isAlive = true;
        this.callbacks = [];
    }

    //move the player in the direction he is facing with the player speed
    move() {
        this.poistionX += this.speed * Math.cos(this.directionAngle);
        this.poistionY += this.speed * Math.sin(this.directionAngle);
    }

    // Count up the score for players who are still alive
    addScore(value) {
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
