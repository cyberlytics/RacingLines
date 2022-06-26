import Game from "../components/Game";
import { GameManager } from "./GameManager";
import { Player } from "./Player";

//test if test is set up correctly
test("Sanity check", () => {    
    expect(true).toBe(true);
});

const {GameManager} = require('./GameManager');

//Test if object has all functions
describe("Test if player has all functions of the class Player", () => {
    const gameManager = new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
  
    test("Test if setUpRound() gets defined", () => {
      expect(typeof gameManager.setUpRound).toBe("function");
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

    test("Test if pixelIsWhite() gets defined", () => {
        expect(typeof gameManager.pixelIsWhite).toBe("function");
    })

    test("Test if drawPlayers() gets defined", () => {
        expect(typeof gameManager.drawPlayers).toBe("function");
    })

    test("Test if drawLines() gets defined", () => {
        expect(typeof gameManager.drawLines).toBe("function");
    })
})


//Test the constructor
describe("Test if constructor sets all values and values of parameters for gameManager correct", () => {
    testSoccket = new ServerCommunicationHelper(io.connect(process.env.REACT_APP_IPAddress + ":3001"));
    const gameManager = new GameManager(testSocket, 500);
  
    test("Test if ServeCommunicationHelper of gameManager is new ServerCommunicationHelper(Socket) ", () => {
      expect(gameManager.ServerCommunicationHelper).toEqual(testSocket);
    })
  
    test("Test if Renderer is a new Renderer() ", () => {
      expect(gameManager.Renderer).toEqual(new Renderer());
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
      expect(gameManager.timeSinceLastHole).toEqual(new Date().getTime());
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
      
    gameManager.setUpRound();
  
    test("Test if the game is not running is true", () => {
      expect(gameManager.gameRunning).toBe(false);
    })
  
    //StartGame() + gameRunning==true check
})
  
//Test function updateGameState
describe("Test if update of game state is functioning",()=>{
    
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const player1 = new Player("Tester1", 1, "orange", "orange", "100", "100", Math.PI);
    const player2 = new Player("Tester2", 2, "green", "green", 400, 400, Math.PI); 
      
    let player = [];
      
    player[0] = player1;
    player[1] = player2;
      
    gameManager.gameRunning=true;

    //For each player...
    //if statements in 
    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(false);
    })
    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(false);
    })
    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(false);
    })
   
    


    //the rest of the if statemnt 

})

//Test function setClientInput
describe("Test if update of game state reacts to input correctly both false",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(false,false);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(false);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(setClientInput.clientInput.InputRight).toBe(false);
    })

    test("Test if Console.Log is' input: false false'", () => {
        expect(console.log).toHaveBeenCalledWith('input: false false');
    })
})

describe("Test if update of game state reacts to input correctly both true",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(true,true);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(true);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(setClientInput.clientInput.InputRight).toBe(true);
    })

    test("Test if Console.Log is' input: true true'", () => {
        expect(console.log).toHaveBeenCalledWith('input: true true');
    })
})

describe("Test if update of game state reacts to input correctly leftInput true, rightInput false",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(true,false);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(true);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(setClientInput.clientInput.InputRight).toBe(false);
    })

    test("Test if Console.Log is' input: true true'", () => {
        expect(console.log).toHaveBeenCalledWith('input: true false');
    })
})

describe("Test if update of game state reacts to input correctly leftInput false, rightInput true",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.setClientInput(false,true);

    test("Test if Client.Input.Left is the same as Input.Left", () => {
        expect(setClientInput.clientInput.InputLeft).toBe(false);
    })
   
    test("Test if Client.Input.Right is the same as Input.Right", () => {
           expect(setClientInput.clientInput.InputRight).toBe(true);
    })

    test("Test if Console.Log is' input: true true'", () => {
        expect(console.log).toHaveBeenCalledWith('input: false true');
    })
})

//Test function RandomNum
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);  

    gameManager.randomNum(0, 100);

    test("Test if Min value is 0", () => {
    expect(gameManager.min).toBe(0);
  })
  test("Test if Max value is 100", () => {
    expect(gameManager.max).toBe(100);
  })
  
})

//Test function stopDrawing
describe("Test if the stopDrawing Function is working",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player= new Player();
    gameManager.stopDrawing(player,500);
    test("Test if Player.isDrawing is false", () => {
        expect(player.IsDrawing).toBe(false);
    })

    test("Test if the SetTimeOut is called with the right parameters", () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    })
})


//Test function ResumeDrawing
describe("Test if the drawing of the player is resumed",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player= new Player();

    gameManager.resumeDrawing(player);

    test("Test if the Player is getting drawn again", () => {
        expect(player.isDrawing).toBe(true);
    })
})

//Test function startRound
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const player= new Player();

    gameManager.startRound(player, 500);
    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.setUpRound.Players).toBe(player);
    })
    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.setUpRound.boardSize).toBe(500);
    })

    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.firstTick).toEqual(new Date().getTime());
    })
    test("Test if the Player is getting drawn again", () => {
        expect(gameManager.lastTick).toEqual(new Date().getTime());
    })
})

//Test function CheckCollision
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);

    gameManager.checkCollision();

    test("Test if ....")
})

//Test function pixelIsWhite
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const pixel= ctx.getImageData(300, 200, 1, 1);
    gameManager.pixelIsWhite(pixel);
   /* test("Test if... ", () => {
        expect().toEqual();
    })*/

})

//Test function drawPlayers
describe("Test if Players are getting drawn",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
   
    gameManager.drawPlayers(canvas, ctx);
    /*test("Test ", () => {
        expect().toEqual();
    })*/
})

//Test function drawLines
describe("Test if update of game state is true/running",()=>{
    const gameManager= new GameManager(io.connect(process.env.REACT_APP_IPAddress + ":3001"), 500);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    gameManager.drawLines(canvas, ctx);

   /* test("Test if ", () => {
        expect().toEqual();
    })*/
})