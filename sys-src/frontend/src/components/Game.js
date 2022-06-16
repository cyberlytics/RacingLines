import React, { useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Player from '../model/Player';

//player class for the game
// separates file

//create game set up class
class GameSetUp {
    constructor(players, boardSize) {
        this.players = players;
        this.boardSize = boardSize;
    }
}

const Game = () => {
    //create player
    const player = new Player('Player 1', 1, 'red', 'black');
    //const player2 = new Player('Player 2', 2, 'orange', 'blue');

    //create game
    // score ändert sich iim player objekt - react ändert ui nur bei state
    const gameSetUp = new GameSetUp([player], 800);

    function AddScore(value) {
        gameSetUp.players.forEach((player) => {
            player.addScore(value);
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            AddScore(10);
        }, 1000);
        return () => clearInterval(interval);
    });

    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                player.directionAngle -= Math.PI / 25;
            } else if (event.key === 'ArrowRight') {
                player.directionAngle += Math.PI / 25;
            } else if (event.key === 'a') {
                player.directionAngle -= Math.PI / 25;
            } else if (event.key === 'd') {
                player.directionAngle += Math.PI / 25;
            }
        });
    });

    //collision detection for the player
    //if the player hits the wall or the other player the player dies
    useEffect(() => {
        if (
            player.poistionX > gameSetUp.boardSize ||
            player.poistionX < 0 ||
            player.poistionY > gameSetUp.boardSize ||
            player.poistionY < 0
        ) {
            player.isAlive = false;
        }
    });

    //Game loop
    //Draw the game and move the player with a tick rate of 60 times per second
    useEffect(() => {
        const tick = setInterval(() => {
            //sets up the canvas
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = gameSetUp.boardSize;
            canvas.height = gameSetUp.boardSize;

            movePlayers();
            draw();

            //update all player positions if the player is alive
            function movePlayers() {
                gameSetUp.players.forEach((player) => {
                    if (player.isAlive === true) {
                        player.move();
                    }
                });
                //check if the player with the walls, other players and if the player the trail
                gameSetUp.players.forEach((player) => {
                    if (player.isAlive === true) {
                        for (let i = 0; i < gameSetUp.players.length; i++) {
                            if (
                                player.poistionX ===
                                    gameSetUp.players[i].poistionX &&
                                player.poistionY ===
                                    gameSetUp.players[i].poistionY &&
                                player.id !== gameSetUp.players[i].id
                            ) {
                                player.isAlive = false;
                            }
                        }
                        if (
                            player.poistionX > gameSetUp.boardSize ||
                            player.poistionX < 0 ||
                            player.poistionY > gameSetUp.boardSize ||
                            player.poistionY < 0
                        ) {
                            player.isAlive = false;
                        }
                    }
                });
            }

            //draws the game
            //draws the player as a circle with the players color
            //draws trail of the player as a line with the player's wall color
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameSetUp.players.forEach((player) => {
                    //draws the game border
                    ctx.beginPath();
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = 'black';
                    ctx.stroke();

                    //Code Source for player trail: https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas?answertab=active#tab-top
                    //draws the player's trail
                    //move to the first point
                    // Was macht positionStack? FRAGEN! wird nie aufgerufen - positionStack ist immer leer
                    ctx.moveTo(
                        player.positionStack[0].x,
                        player.positionStack[0].y
                    );
                    ctx.strokeStyle = player.wallColor;
                    let i = 1;
                    for (; i < player.positionStack.length - 2; i++) {
                        //console.log("for");
                        let xc =
                            (player.positionStack[i].x +
                                player.positionStack[i + 1].x) /
                            2;
                        let yc =
                            (player.positionStack[i].y +
                                player.positionStack[i + 1].y) /
                            2;
                        ctx.quadraticCurveTo(
                            player.positionStack[i].x,
                            player.positionStack[i].y,
                            xc,
                            yc
                        );
                    }
                    // curve through the last two points
                    ctx.quadraticCurveTo(
                        player.positionStack[i].x,
                        player.positionStack[i].y,
                        player.positionStack[i + 1].x,
                        player.positionStack[i + 1].y
                    );
                    ctx.lineWidth = player.size * 0.8;
                    ctx.stroke();

                    //draws the player
                    ctx.beginPath();
                    ctx.strokeStyle = player.circleColor;
                    ctx.fillStyle = player.circleColor;
                    ctx.arc(
                        player.poistionX,
                        player.poistionY,
                        player.size / 2,
                        0,
                        2 * Math.PI
                    );
                    ctx.fill();
                    ctx.stroke();
                });
            }
        }, 1000 / 60);
        return () => clearInterval(tick);
    });

    //useEffect for the player trail
    //add the player position of all players to the position stack
    useEffect(() => {
        const tick = setInterval(() => {
            gameSetUp.players.forEach((player) => {
                if (player.isAlive === true) {
                    player.positionStack.push({
                        x: player.poistionX,
                        y: player.poistionY,
                    });
                }
            });
        }, 1000 / 30);
        return () => clearInterval(tick);
    });

    return (
        <>
            <header>
                <canvas />
            </header>
            <div>
                <Scoreboard gameSetUp={gameSetUp} />
            </div>
        </>
    );
};
export default Game;
