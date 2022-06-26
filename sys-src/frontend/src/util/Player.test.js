//test if test is set up correctly
//Sanity check from:
//https://yonatankra.com/how-to-test-html5-canvas-with-jest/
test("Sanity check", () => {    
    expect(true).toBe(true);
});

const {Player} = require('./Player');

//Test if object has all functions
describe("Test if player has all functions of the class Player", () => {
     const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    test("Test if move() gets defined", () => {
        expect(typeof player.move).toBe("function");
    })

    test("Test if updateDirection() gets defined", () => {
        expect(typeof player.updateDirection).toBe("function");
     })

    test("Test if addToPlayerStateBuffer() gets defined", () => {
        expect(typeof player.addToPlayerStateBuffer).toBe("function");
    })

    test("Test if setPlayerState() gets defined", () => {
        expect(typeof player.setPlayerState).toBe("function");
    })

    test("Test if addScore() gets defined", () => {
        expect(typeof player.addScore).toBe("function");
    })

    test("Test if subscribe() gets defined", () => {
        expect(typeof player.subscribe).toBe("function");
    })

    test("Test if unsubscribe() gets defined", () => {
        expect(typeof player.unsubscribe).toBe("function");
    })

    test("Test if updateObservers() gets defined", () => {
        expect(typeof player.updateObservers).toBe("function");
    })
})


//Test the constructor
describe("Test if constructor sets all values and values of parameters for player correct", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    test("Test if name of player is 'Test'", () => {
        expect(player.name).toEqual('Test');
    })

    test("Test if id is 1", () => {
        expect(player.id).toEqual(1);
    })

    test("Test if size is 11", () => {
        expect(player.size).toEqual(11);
    })

    test("Test if directionAngle is Math.PI", () => {
        expect(player.directionAngle).toEqual(Math.PI);
    })

    test("Test if circleColor is 'red'", () => {
        expect(player.circleColor).toEqual('red');
    })

    test("Tst if lineColor is 'blue'", () => {
        expect(player.lineColor).toEqual('blue');
    })

    test("Test if score is 0", () => {
        expect(player.score).toEqual(0);
    })

    test("Test if speed is 100", () => {
        expect(player.speed).toEqual(100);
    })

    test("Test if isAlive is true", () => {
        expect(player.isAlive).toEqual(true);
    })

    test("Test if positionY is 100", () => {
        expect(player.positionY).toEqual(100);
    })

    test("Test if positionX is 100", () => {
        expect(player.positionX).toEqual(100);
    })

    test("Test if lastY is 100", () => {
        expect(player.lastY).toEqual(100);
    })

    test("Test if lastX is 100", () => {
        expect(player.lastX).toEqual(100);
    })

    test("Test if isDrawing is true", () => {
        expect(player.isDrawing).toEqual(true);
    })

    test("Test if playerStateBuffer is empty", () => {
        expect(player.playerStateBuffer.length).toBe(0);
    })

    test("Test if callbacks is empty", () => {
        expect(player.callbacks.length).toBe(0);
    })
})


//Test function move
describe("Test if move sets positions of the player if player is alive", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);
    
    /*set other values for positionX and positionX because the constructor already showed 
    that positonX/Y is the same as lastX/Y after first initialisation*/
    player.positionX = 200;
    player.positionY = 150;

    player.move(1000/60);

    test("Test if player is alive is true", () => {
        expect(player.isAlive).toBe(true);
    })

    test("Test if lastX is 200", () => {
        expect(player.lastX).toBe(200);
    })

    test("Test if lastY is 150", () => {
        expect(player.lastY).toBe(150);
    })

    /*test("Test if positionX is ", () => {
        expect(player.positionX).toBe();
    })

    test("Test if positionY is ", () => {
        expect(player.positionY).toBe();
    })*/
})

describe("Test if move does not set positions of the player if player is not alive", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    /*set other values for positionX and positionX because the constructor already showed 
    that positonX/Y is the same as lastX/Y after first initialisation*/
    player.positionX = 200;
    player.positionY = 150;

    player.isAlive = false;

    player.move();

    test("Test if player isAlive is false", () => {
        expect(player.isAlive).toBe(false);
    })

    test("Test if lastX is unchanges and still 100", () => {
        expect(player.lastX).toBe(100);
    })

    test("Test if lastY is unchanges and still 100", () => {
        expect(player.lastY).toBe(100);
    })

    test("Test if positionX is unchanged and still 200", () => {
        expect(player.positionX).toBe(200);
    })

    test("Test if positionY is unchanged and still 150", () => {
        expect(player.positionY).toBe(150);
    })
})


//Test function updateDirection
describe("Test if updateDirection reacts to input correctly both false", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.updateDirection(false, false);

    test("Test if directionAngle is still Math.PI", () => {
        expect(player.directionAngle).toBe(Math.PI);
    })
})

describe("Test if updateDirection reacts to input correctly both true", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.updateDirection(true, true);

    test("Test if directionAngle is still Math.PI", () => {
        expect(player.directionAngle).toBe(Math.PI);
    })
})

describe("Test if updateDirection reacts to input correctly leftInput true, rightInput false", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.updateDirection(true, false);

    test("Test if directionAngle is 3.0967127585385105", () => {
        expect(player.directionAngle).toBe(3.0967127585385105);
    })
})

describe("Test if updateDirection reacts to input correctly leftInput false, rightInput true", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.updateDirection(false, true);

    test("Test if directionAngle is 3.186472548641076", () => {
        expect(player.directionAngle).toBe(3.186472548641076);
    })
})


//Test function addToPlayerStateBuffer
describe("Test if addToPlayerStateBuffer pushes parameters into playerStateBuffer", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);
    var testPop = [];

    player.addToPlayerStateBuffer(150,160, true);
    testPop = player.playerStateBuffer.pop();

    test("Test if positionX that got pushed in playerStateBuffer is 150", () => {       
        expect(testPop.positionX).toBe(150);
    })

    test("Test if postitionY that got pushed in playerStateBuffer is 160", () => {
        expect(testPop.positionY).toBe(160);
    })

    test("Test if isDrawing that got pushed in playerStateBuffer is true", () => {
        expect(testPop.isDrawing).toBe(true);
    })
})


//Test function setPlayerState
describe("Test if setPlayerState sets parameters as values", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    /*set other values for positionX and positionX because the constructor already showed 
    that positonX/Y is the same as lastX/Y after first initialisation*/
    player.positionX = 115;
    player.positionY = 105;

    player.setPlayerState(123, 111, true);

    test("Test if lastX is 115", () => {
        expect(player.lastX).toBe(115);
    })
    
    test("Test if lastY is 105", () => {
        expect(player.lastY).toBe(105);
    })

    test("Test if positionX is 123", () => {
        expect(player.positionX).toBe(123);
    })

    test("Test if positionY is 111", () => {
        expect(player.positionY).toBe(111);
    })

    test("Test if isDrawing is true", () => {
        expect(player.isDrawing).toBe(true);
    })
})


//Test function addScore
describe("Test if addScore adds value to the score", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.addScore(10);

    test("Test if score of the player is 10", () => {
        expect(player.score).toBe(10);
    })
})

describe("Test if addScore adds nothing to the score when player is dead", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);

    player.isAlive = false;
    player.addScore(10);

    test("Test if score of the player is still 0", () => {
        expect(player.score).toBe(0);
    })
})


//Test function subscribe
describe("Test if callback", () => {
    const player = new Player("Test", 1, "red", "blue", 100, 100, Math.PI);


    player.subscribe(10);

    test("Test if callback ", () => {
        expect(player.callbacks.length).toBe(1);
    })
})