require('jest-canvas-mock');

const { Player } = require('./Player');
const {Renderer} = require('./Renderer');


//Test if object has all functions
describe("Test if renderer has all functions of the class Renderer", () => {
  const renderer = new Renderer();

  test("Test if drawPlayers is defined", () => {
    expect(typeof renderer.drawPlayers).toBe("function");
  })

  test("Test if drawLines is defined", () => {
    expect(typeof renderer.drawLines).toBe("function");
  })

})


//The following tests got written with the help of the article
//https://yonatankra.com/how-to-test-html5-canvas-with-jest/
//Test function drawPlayers()
describe("Test if drawPlayers() draws players on canvas", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const player1 = new Player("TestPlayer1", 1, "red", "red", "100", "100", Math.PI);
  const player2 = new Player("TestPlayer2", 2, "blue", "blue", 400, 400, Math.PI); 

  let player = [];

  player[0] = player1;
  player[1] = player2;

  const renderer = new Renderer();
  
  test("", () => {
    renderer.drawPlayers(player, 0, canvas, ctx);

    //Saves method calls
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  })

})


//Test function drawLines()
describe("Test if drawLines() draws lines of players on canvas", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const player1 = new Player("TestPlayer1", 1, "red", "red", "100", "100", Math.PI);
  const player2 = new Player("TestPlayer2", 2, "blue", "blue", 400, 400, Math.PI); 
  player2.isDrawing = false;

  let player = [];

  player[0] = player1;
  player[1] = player2;

  const renderer = new Renderer();
  renderer.borderDrawn = true;

  test("Test drawLines with borderDrawn is true", () => {
    renderer.drawLines(player, 0, canvas, ctx);

    //Saves method calls
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  })
})

describe("Test if drawLines() draws lines of players on canvas", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const player1 = new Player("TestPlayer1", 1, "red", "red", "100", "100", Math.PI);
  const player2 = new Player("TestPlayer2", 2, "blue", "blue", 400, 400, Math.PI); 
  player2.isDrawing = false;

  let player = [];

  player[0] = player1;
  player[1] = player2;

  const renderer = new Renderer();
  renderer.borderDrawn = false;

  test("Test drawLines with borderDrawn is false", () => {
    renderer.drawLines(player, 0, canvas, ctx);

    //Saves method calls
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  })
})

describe("Test if drawCountdown() draws the correct countdown on canvas", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const player1 = new Player("TestPlayer1", 1, "red", "red", "100", "100", Math.PI);
  const player2 = new Player("TestPlayer2", 2, "blue", "blue", 400, 400, Math.PI);


  const countDownCanvas = document.createElement("canvas");
  const countDownctx = canvas.getContext("2d");

  let player = [];

  player[0] = player1;
  player[1] = player2;

  const renderer = new Renderer();

  test("Test if the countdown matches the snapshot.", () => {
    renderer.drawPlayers(player, 0, canvas, ctx);
    renderer.drawCountdown(player, 0, countDownCanvas, countDownctx, 1);

    //Saves method calls
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  })

})


describe("Test if clearCountdown() clears the countdown on canvas", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const player1 = new Player("TestPlayer1", 1, "red", "red", "100", "100", Math.PI);
  const player2 = new Player("TestPlayer2", 2, "blue", "blue", 400, 400, Math.PI);


  const countDownCanvas = document.createElement("canvas");
  const countDownctx = canvas.getContext("2d");

  let player = [];

  player[0] = player1;
  player[1] = player2;

  const renderer = new Renderer();

  test("Test if the countdown was cleared and matches the snapshot.", () => {
    renderer.drawPlayers(player, 0, canvas, ctx);
    renderer.drawCountdown(player, 0, countDownCanvas, countDownctx, 1);
    renderer.clearCountdown(countDownCanvas,countDownctx);

    //Saves method calls
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  })

})

