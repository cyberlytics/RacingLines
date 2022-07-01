import Game from "../components/Game";
import io from "socket.io-client";
import {drawPlayers} from "./Renderer";
//import { GameManager } from "./GameManager";
import { Player } from "./Player";
import { ServerCommunicationHelper } from "./ServerCommunicationHelper";
const {canvas}=require('jest-canvas-mock');
import 'core-js';

const {Renderer} = require('./Renderer');
const mockMath = Object.create(global.Math);
mockMath.random = () => 1;
global.Math = mockMath;

const {GameManager} = require('./GameManager');

//test if test is set up correctly
test("Sanity check", () => {    
    expect(true).toBe(true);
});

//Test if object has all functions
describe("Test if player has all functions of the class Player", () => {
    const gameManager = new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
  
    test("Test if setUpRound() gets defined", () => {
      expect(typeof gameManager.setUpRound).toBe("function");
    })

    test("Test if addPlayer() gets defined", () => {
        expect(typeof gameManager.addplayer).toBe("function");
    })
  
    test("Test if updateGameState() gets defined", () => {
      expect(typeof gameManager.updateGameState).toBe("function");
    })
  
    test("Test if setClientInput() gets defined", () => {
      expect(typeof gameManager.setClientInput).toBe("function");
    })
  
    test("Test if randomNum() gets defined", () => {
      expect(typeof gameManager.randomNum).toBe("function");
    })

    test("Test if stopDrawinf() gets defined", () => {
        expect(typeof gameManager.stopDrawing).toBe("function");
    })

    test("Test if resumeDrawing() gets defined", () => {
        expect(typeof gameManager.resumeDrawing).toBe("function");
    })

    test("Test if startRound() gets defined", () => {
        expect(typeof gameManager.startRound).toBe("function");
    })

    test("Test if checkCollision() gets defined", () => {
        expect(typeof gameManager.checkCollision).toBe("function");
    })

    test("Test if increaseScore() gets defined", () => {
        expect(typeof gameManager.increaseScore).toBe("function");
    })
    
    test("Test if pixelIsWhite() gets defined", () => {
        expect(typeof gameManager.pixelIsWhite).toBe("function");
    })

    test("Test if drawPlayers() gets defined", () => {
        expect(typeof gameManager.drawPlayers).toBe("function");
    })

    test("Test if drawLines() gets defined", () => {
        expect(typeof gameManager.drawLines).toBe("function");
    })

    test("Test if subscribe() gets defined", () => {
        expect(typeof gameManager.subscribe).toBe("function");
    })
    test("Test if unsubscribe() gets defined", () => {
        expect(typeof gameManager.unsubscribe).toBe("function");
    })
    test("Test if updateObservers() gets defined", () => {
        expect(typeof gameManager.updateObservers).toBe("function");
    })
})

//Test the constructor
describe("Test if constructor sets all values and values of parameters for gameManager correct", () => {
    const testsocket = io.connect(process.env.REACT_APP_IPAddress + ":3001");
    const serverCommunicationHelper = new ServerCommunicationHelper(testsocket);


    const gameManager = new GameManager(serverCommunicationHelper, 500);
    const renderer= new Renderer();
    const mockDate = new Date().getTime();


    test("Test if ServeCommunicationHelper of gameManager is new ServerCommunicationHelper(Socket) ", () => {
      expect(gameManager.ServerCommunicationHelper.Socket).toEqual(serverCommunicationHelper);
    })

    test("Test if Renderer is a new Renderer() ", () => {
      expect(gameManager.Renderer).toEqual(renderer);
    })
  
    test("Test if roundCount is 0", () => {
      expect(gameManager.roundCount).toEqual(0);
    })
  
    test("Test if boardSize is boardSize", () => {
      expect(gameManager.boardSize).toEqual(500);
    })
  
    test("Tst if clientInput is { InputLeft: false, InputRight: false }", () => {
      expect(gameManager.clientInput).toEqual({ InputLeft: false, InputRight: false });
    })
  
    test("Test if timeScinceLastHole is new Date().getTime() ", () => {
      expect(gameManager.timeSinceLastHole).toBe(mockDate);
    })
  
    test("Test if clientID is ", () => {
      expect(gameManager.clientID).toEqual();
    })
  
    test("Test if gameRunning is false", () => {
      expect(gameManager.gameRunning).toEqual(false);
    })
  
})

//Test function setUpRound()
describe("Test if move sets up the Rounds ", () => {

    const gameManager = new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    gameManager.gameRunning=false;
    
    gameManager.setUpRound();

   test("Test if the game is not running is true", () => {
      expect(gameManager.ServerCommunicationHelper.startGame).toBeCalled;
    })

    test("Test if the gameRunning is true", () => {
        expect(gameManager.gameRunning).toEqual(true);
    })
   
})
  
//Test function updateGameState
describe("Test if update of game state is functioning",()=>{
    
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    gameManager.gameRunning=false;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
   

    gameManager.updateGameState(1000/6, ctx);
    // Check for unchanged player states while game is not running
    test("Test if nothing changes when gamerunning is false", () => {
    expect(gameManager.updateGameState(1000/6, ctx)).toBeUndefined;
    })   
})

describe("Test if update of game state is functioning",()=>{
   // player.id !== this.clientId && player.playerStateBuffer.length > 0 && player.playerStateBuffer>=5 -> THEN to this shit
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player2 = new Player("Tester2", 2, "green", "green", 400, 400, Math.PI); 
      
    let player = [];
    player[0] = player1;
    player[1] = player2;
    let playerState;
    let latestPlayerState;
    player.id=2;
    gameManager.clientId=1;
    player.playerStateBuffer=[];
    player.playerStateBuffer.length=5;
    gameManager.gameRunning=true;


    gameManager.updateGameState(1000/6, ctx);

    test("Test if playerstate is buffer Shift", () => {
        expect(player.playerStateBuffer.shift()).toEqual(playerState);
    }) 
    test("Test if playerstate is buffer Shift", () => {
        expect(player.playerStateBuffer.pop()).toEqual(latestPlayerState);
    }) 

    test("Test the if player.playerStateBuffer.push(playerState) is called ", () => {
        expect(player.playerStateBuffer.push(playerState)).toBeCalled;
    })
    
    test("Test the if layer.playerStateBuffer.push(latestPlayerState) is called ", () => {
        expect(player.playerStateBuffer.push(latestPlayerState)).toBeCalled;
    })

    test("Test the if layer.playerStateBuffer.push(latestPlayerState) is called ", () => {
        expect(gameManager.checkCollision(player, ctx)).toBeCalled;
    })
})

describe("Test if update of game state is functioning",()=>{
    //Playerstate != nulll
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player2 = new Player("Tester2", 2, "green", "green", 400, 400, Math.PI); 
    let player = [];
    player[0] = player1;
    player[1] = player2;
    let playerState;
    player.id=1;
    gameManager.clientId = 2;
    player.playerStateBuffer=[];
    player.playerStateBuffer.length=3;
    
    playerState!= null;


    gameManager.updateGameState(1000/6, ctx);

    
    test("Test if playerstate is buffer Shift", () => {
        expect(player.playerStateBuffer.shift()).toEqual(playerState);
    }) 
})


describe("Test if update of game state is functioning",()=>{
    //player.id == this.ClientId &&  random =01
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player2 = new Player("Tester2", 2, "green", "green", 400, 400, Math.PI); 

    gameManager.randomNum(1,60)==1;
    const deltaTime= 1000/6;
    let player = [];
    player[0] = player1;
    player[1] = player2;
      
    player.id=1;
    gameManager.clientId=1;

    gameManager.gameRunning=true;
    gameManager.updateGameState(1000/6, ctx);
    // Check for unchanged player states while game is not running
    test("Test if updateDirection gets called", () => {
        expect(player1.updateDirection(gameManager.clientInput.InputLeft, gameManager.clientInput.InputRight)).toBeCalled;
    })

    test("Test if move gets called", () => {
        expect(player1.move(1000/6)).toBeCalled;
    })
    test("Test if checkCollision gets called", () => {
        expect(gameManager.checkCollision(player, ctx)).toBeCalled;
    })
    test("Test if StopsDrawing gets called", () => {
        expect(gameManager.stopDrawing(player, gameManager.randomNum(250,350))).toBeCalled;
    })
    test("Test if StopsDrawing gets called", () => {
        expect(gameManager.ServerCommunicationHelper.sendClientPlayerState(player.positionX, player.positionY, player.IsDrawing)).toBeCalled;
    })

})

//Test function setClientInput
describe("Test if update of game state reacts to input correctly both false",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(false,false);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(gameManager.clientInput.InputLeft).toBe(false);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(gameManager.clientInput.InputRight).toBe(false);
    })

})

describe("Test if update of game state reacts to input correctly both true",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(true,true);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(gameManager.clientInput.InputLeft).toBe(true);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
        expect(gameManager.clientInput.InputRight).toBe(true);
    })

   
})

describe("Test if update of game state reacts to input correctly leftInput true, rightInput false",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(true,false);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(gameManager.clientInput.InputLeft).toBe(true);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(gameManager.clientInput.InputRight).toBe(false);
    })
})

describe("Test if update of game state reacts to input correctly leftInput false, rightInput true",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(false,true);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(gameManager.clientInput.InputLeft).toBe(false);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(gameManager.clientInput.InputRight).toBe(true);
    })  
})

//Test function RandomNum
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);  
    const min=20;
    const max=100;
    gameManager.randomNum(min, max);

    test("Test if Min value is 20", () => {
    expect(min).toEqual(20);
    })

    test("Test if Max value is 100", () => {
    expect(max).toEqual(100);
    })

    test("Test if Math.floor is returned as 50,5", () => {
        expect(Math.random()).toBe(1);
    })
   test("Test if Math.floor is returned as 101", () => {
        expect(gameManager.randomNum(min,max)).toBe(101);
    })
    
})

//Test function stopDrawing
describe("Test if the stopDrawing Function is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    player.IsDrawing=false;
   
    gameManager.stopDrawing(player,500);

    test("Test if Player.isDrawing is false", () => {
        expect(player.IsDrawing).toBe(false);
    })

    test('waits gameManager.Time before calling ResumeDrawing Function', () => {
       expect(setTimeout(gameManager.resumeDrawing, 500, player)).toBeCalled;
    });
})

//Test function ResumeDrawing
describe("Test if the drawing of the player is resumed",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    player.IsDrawing=true;

    gameManager.resumeDrawing(player);

    test("Test if the Player is getting drawn again", () => {
        expect(player.isDrawing).toBe(true);
    })
})

//Test function startRound
describe("Test if function StartRound is working ",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player1= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const players=[];
    players[0]=player1;
    const mockdate= new Date().getTime();

    gameManager.startRound(players, 500);
   test("Test if the SetUp function is called ", () => {
        expect(gameManager.setUpRound()).toBeCalled;
    })
  
    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.firstTick).toEqual(mockdate);
    })
    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.lastTick).toEqual(mockdate);
    })
})

//Test function CheckCollision
describe("Test if CheckCollision is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", 100, 100, Math.PI); 
    let player = [];
    player[0] = player1;
    let i = 0;
    let rad = Math.PI + (Math.PI / 16) * i;
    let posX = 100 + (11 - 3) * Math.cos(rad);
    let posY = 100 + (11 - 3) * Math.sin(rad);
    let px = ctx.getImageData(posX, posY, 1, 1);
   
    gameManager.checkCollision(player1, ctx);

    test("Test if Rad == PI", () => {
        expect(rad).toBe(Math.PI);
    })
    test("Test if PosX == 92", () => {
        expect(posX).toBe(92);
    })
    test("Test if PosY == 96", () => {
        expect(posY).toBe(100);
    })
   test("Test if pixel has the right parameters", () => {
        expect(px).toBe(px);
    })
})

describe("Test if CheckCollision is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", 100, 100, Math.PI);
    const player2 = new Player("Tester2", 2, "green", "green", 400, 400, Math.PI); 
      
    let player = [];
    player[0] = player1;
    player[1] = player2;
   
    

    const pixel= ctx.getImageData(300, 200, 1, 1);
    gameManager.pixelIsWhite(pixel)==false;
    player.isAlive=false;
    gameManager.checkCollision(player, ctx);

    test("When Pixel is not true expect isAlive to be false and IncreaseScore to be called", () => {
        expect(player.isAlive).toBe(false);
        expect(gameManager.increaseScore()).toBeCalled;
    })
})

//Test function pixelIsWhite
describe("Test if pixel is white",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pixel= ctx.getImageData(300, 200, 1, 1);
   

    gameManager.pixelIsWhite(pixel);
   test("Test if PixelIsWhite returns true ", () => {
        expect(gameManager.pixelIsWhite(pixel)).toBe(true);
    })
})
describe("Test if pixel is not white",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pixel= ctx.getImageData(300, 200, 1, 1);
   
    pixel.data[1] = 2;

    gameManager.pixelIsWhite(pixel);
   test("Test if PixelIsWhite returns true ", () => {
        expect(gameManager.pixelIsWhite(pixel)).toBe(false);
    })
})

describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pixel= ctx.getImageData(300, 200, 1, 1);
    gameManager.pixelIsWhite(pixel);

    pixel.data[2] == 0;

    gameManager.pixelIsWhite(pixel);

   test("Test if... ", () => {
        expect(gameManager.pixelIsWhite(pixel)).toBe(true);
    })

})


//Test function drawPlayers
describe("Test if Players are getting drawn",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const renderer= new Renderer();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", 100, 100, Math.PI); 
    const players=[];
    players[0]= player1;
    
    jest.spyOn(renderer, 'drawPlayers')
    
  it('should get the function called', () => {  
    expect(renderer.drawPlayers(gameManager.players, gameManager.boardSize, canvas, ctx)).toBeCalled;
    expect(renderer.drawPlayers).toHaveBeenCalledTimes(1)
  });
    
})

//Test function drawLines
describe("Test if function drawLines is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const renderer= new Renderer();
    const ctx = canvas.getContext("2d");
    
    gameManager.drawLines(canvas, ctx);
    jest.spyOn(renderer, 'drawLines')
    
    it('should get the function called', () => {  
      expect(renderer.drawLines(gameManager.players, gameManager.boardSize, canvas, ctx)).toBeCalled;
      expect(renderer.drawLines).toHaveBeenCalledTimes(1)
    });
})


//Test function addPlayer
describe("Test if function addPlayer is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player1= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const players=[];
    players[0]=player1;
    players[1]=player;
    
    gameManager.addplayer(player);

   test("Test if player is added to Players-Array ", () => {
        expect(gameManager.players.push(player)).toBeCalled;
    })
    test("Test if function updateObservers is getting called ", () => {
        expect(gameManager.updateObservers()).toBeCalled;
    })

})

//Test function increaseScore
describe("Test if function increaseScore is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player1= new Player("Tester2", 2, "red", "Red", "300", "300", Math.PI);
    const players=[];
    players[0]=player1;
    players[1]=player;
    player.addScore=50;
    gameManager.increaseScore();
    player.isAlive=true;

   test("Test if player is added to Players-Array ", () => {
        expect(player.addScore).toBe(50);
    })
})


//Test function subscribe
describe("Test if function subscribe is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player1= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const players=[];
    players[0]=player1;
    players[1]=player;
    const callback=1;
    let i=0;
    gameManager.subscribe(callback);

   test("Test if player is added to Players-Array ", () => {
        expect(gameManager.callbacks.push(callback)).toBeCalled;
    })

})

//Test function unsubscribe
describe("Test if function unsubscribe is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player1= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const players=[];
    players[0]=player1;
    players[1]=player;
    const callback=[];
  
    let callbacksItem = gameManager.callbacks.filter((item) => item !== callback);
    gameManager.unsubscribe(callback);

   test("Test if player is Remvoved from observers list ", () => {
        expect(gameManager.callbacks).toEqual(callbacksItem)
    });
})

//Test function updateObservers
/*describe("Test if function updateObservers is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player= new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);

    gameManager.callbacks[0]=player;
    gameManager.updateObservers();

   test("Test if observers are notified when specific event occurs", () => {
        expect(gameManager.callbacks[0]).toBe(player);
    })
})*/