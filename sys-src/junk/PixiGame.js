import React, { useRef, useEffect } from "react";
import {Application, Graphics, Mesh} from "pixi.js";

//player class for the game
class Player {
    constructor(name, id, circleColor, wallColor) {
        this.name = name;
        this.poistionX = 400;
        this.poistionY = 400;
        this.id = id;
        this.size = 30;
        this.directionAngle = 0;
        this.circleColor = circleColor;
        this.wallColor = wallColor;
        this.score = 0;
        this.positionStack = [];
        this.speed = 5;
        this.isAlive = true;
    }

    //move the player in the direction he is facing with the player speed
    move() {
        this.poistionX += this.speed * Math.cos(this.directionAngle);
        this.poistionY += this.speed * Math.sin(this.directionAngle);
    }
}

//create game set up class
class GameSetUp {
    constructor(players, boardSize) {
        this.players = players;
        this.boardSize = boardSize;
    }
}

function MyComponent() {
    const ref = useRef(null);

    //create player
    const player = new Player("Player 1", 1, "red", "black");
    //create game
    const gameSetUp = new GameSetUp([player], 1600);

    useEffect(() => {
        // On first render create our application
        const app = new Application({
            width: 800,
            height: 600,
            backgroundColor: 0x5BBA6F,
            antialias: true
        });

        // Add app to DOM
        ref.current.appendChild(app.view);
        // Start the PixiJS app
        app.start();

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                player.directionAngle -= Math.PI / 25;
            } else if (event.key === "ArrowRight") {
                player.directionAngle += Math.PI / 25;
            } else if (event.key === "a") {
                player.directionAngle -= Math.PI / 25;
            } else if (event.key === "d") {
                player.directionAngle += Math.PI / 25;
            }
        });

        if (player.poistionX > gameSetUp.boardSize || player.poistionX < 0 || player.poistionY > gameSetUp.boardSize || player.poistionY < 0) {
            player.isAlive = false;
        }

        const rectangle = new Graphics();
        rectangle.beginFill(0xAA33BB)
            .lineStyle(4,0xFFEA00, 1)
            .drawRect(200,200,100,100)
            .endFill();

        app.stage.addChild(rectangle);

        player.positionStack.push({
            x: player.poistionX,
            y: player.poistionY
        });
        player.positionStack.push({
            x: player.poistionX,
            y: player.poistionY
        });
        player.positionStack.push({
            x: player.poistionX,
            y: player.poistionY
        });

        app.ticker.maxFPS=60;



        app.ticker.add(delta => loop2(delta));
        app.ticker.remove(delta => loop2(delta));

        let elapsedTime = 0;

        function loop2(delta) {

            gameSetUp.players.forEach((player) => {
                if (player.isAlive === true && ((Math.abs(player.poistionX - player.positionStack[player.positionStack.length-1].x) > 10) || Math.abs(player.poistionY - player.positionStack[player.positionStack.length-1].y) > 10))
                {
                    player.positionStack.push({
                        x: player.poistionX,
                        y: player.poistionY
                    });
                }
            });

        }


        app.ticker.add(delta => loop(delta));

        function loop(delta) {

            console.log(app.ticker.FPS);

            movePlayers();
            draw();

            function movePlayers() {
                gameSetUp.players.forEach((player) => {
                    if (player.isAlive === true) {
                        player.move();
                    }
                });
            }

            function draw() {
                app.stage.removeChildren();
                gameSetUp.players.forEach((player) => {


                    let i = 1;


                    for (; i < player.positionStack.length - 2; i++) {
                        var playertail = new Graphics();
                        playertail.interactive = true;
                        playertail.buttonMode = true;
                        playertail.lineStyle(5, player.wallColor);
                        playertail.moveTo(player.positionStack[i].x, player.positionStack[i].y);
                        playertail.quadraticCurveTo(player.positionStack[i].x, player.positionStack[i].y, player.positionStack[i + 1].x, player.positionStack[i + 1].y);
                        app.stage.addChild(playertail);
                    }
                    var playertail = new Graphics();
                    playertail.interactive = true;
                    playertail.buttonMode = true;
                    playertail.lineStyle(5, player.wallColor);
                    playertail.moveTo(player.positionStack[i].x, player.positionStack[i].y);
                    playertail.quadraticCurveTo(player.positionStack[i].x, player.positionStack[i].y, player.poistionX, player.poistionY);
                    app.stage.addChild(playertail);

                    // curve through the last two points

                    let playerhead = new Graphics();
                    playerhead.interactive = true;
                    playerhead.buttonMode = true;
                    playerhead.beginFill();
                    playerhead.lineStyle(5, player.wallColor);
                    playerhead.arc(player.poistionX, player.poistionY, player.size / 4, 0, 2 * Math.PI);


                    app.stage.addChild(playerhead);
                });


            }
        }

        return () => {
            // On unload completely destroy the application and all of it's children
            app.destroy(true, true);
        };
    }, []);

    return <div ref={ref} />;
}

export default MyComponent;