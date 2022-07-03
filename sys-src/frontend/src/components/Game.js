import React, { useEffect } from 'react';
import { GameManager } from '../util/GameManager';
import io from 'socket.io-client';
import { useSearchParams, useLocation  } from 'react-router-dom';
import { Player } from '../util/Player';
import Scoreboard from './Scoreboard';
import  socket  from '../util/socketConfig';


const Game = () => {

    // default boardSize
    const boardSize = 800;

    const GamMan = new GameManager(socket, boardSize);

    const [roomParam] = useSearchParams();
    const room = roomParam.get('room');
    GamMan.ServerCommunicationHelper.setRoom(room);

    let countDownTime = null;

    useEffect(() => {

        socket.on('newPlayerState', (data) => {
            for (let i = 0; i < GamMan.players.length; i++) {
                if (GamMan.players[i].id === data.playerId) {

                    GamMan.players[i].addToPlayerStateBuffer(
                        data.positionX,
                        data.positionY,
                        data.isDrawing,
                        data.isAlive
                    );
                }
            }
        });

        socket.on('allPlayersDead', (data) => {
            //get canvas and context
            const canvasPl = document.getElementById('cvPlayers');
            const ctxPl = canvasPl.getContext('2d');

            const canvasLi = document.getElementById('cvLines');
            const ctxLi = canvasLi.getContext('2d');

            //next round
            if (GamMan.roundStarted === true) {
                GamMan.roundCount++;
            }
            GamMan.roundStarted = false;
            GamMan.countdownStarted = false;
            GamMan.clearPlayers(canvasPl, ctxPl);
            GamMan.clearLines(canvasLi, ctxLi);
            GamMan.resetPlayers();
            GamMan.Renderer.borderDrawn = false;

            let roundCount = GamMan.roundCount;

            GamMan.updateObservers();
            socket.emit("nextRound", {room, roundCount});
        });


        socket.on('startCountdown', (data) => {
            let clientDictionary = data.clientDictionary;
            if (GamMan.players.length != 0) {
                while (GamMan.players.length > 0) GamMan.players.pop();
            }

            Object.entries(clientDictionary).forEach(([key, value]) => {
                let player = new Player(
                    value.player.Name,
                    key,
                    value.player.PlayerColor,
                    value.player.LineColor,
                    value.x,
                    value.y,
                    value.direction,
                    value.player.Score
                );
                player.addToPlayerStateBuffer(value.x, value.y, true);
                GamMan.addplayer(player);
            });
            GamMan.updateObservers();
            GamMan.players.forEach((player) => {
                player.addScore(0);
            });

            GamMan.countdownStarted = true;
            countDownTime = new Date().getTime();

        });

        socket.on('gameStarted', (data) => {
            const canvasCo = document.getElementById("cvCountdown");
            const ctxCo = canvasCo.getContext("2d");
            GamMan.clearCountdown(canvasCo, ctxCo);

            GamMan.countdownStarted = false;
            GamMan.roundStarted = true;
        });

        socket.on('gameEnded', (data) => {
            console.log("gameEnded");
            const canvasCo = document.getElementById("cvCountdown");
            const ctxCo = canvasCo.getContext("2d");


            const canvasPl = document.getElementById('cvPlayers');
            const ctxPl = canvasPl.getContext('2d');

            const canvasLi = document.getElementById('cvLines');
            const ctxLi = canvasLi.getContext('2d');

            GamMan.clearCountdown(canvasCo, ctxCo);
            GamMan.clearPlayers(canvasPl, ctxPl);
            GamMan.clearLines(canvasLi, ctxLi);
            GamMan.resetPlayers();
            GamMan.countdownStarted = false;

            const endOfGame = document.getElementById('EndOfGame');
            endOfGame.hidden = false;

            while (endOfGame.firstChild) {
                endOfGame.removeChild(endOfGame.firstChild);
            }

            const h1 = document.createElement('h1');
            h1.innerHTML = "Game is Over!";
            h1.style.textAlign = "center";
            endOfGame.appendChild(h1);

            const button = document.createElement('button');
            button.innerHTML = "Back to Lobby";
            button.style.textAlign = "center";
            button.style.color = "white";
            button.style.backgroundColor = '#3b3b3b';
            button.onclick = () => {
                window.location.href = '/Lobby?room=' + data.room;
            }
            button.style.borderRadius = "8px";
            button.style.width = "200px";
            button.style.height = "30px";
            button.addEventListener('mouseover', () => {
                button.style.cursor = 'pointer';
            });
            endOfGame.appendChild(button);
        });

        socket.on('connect', () => {
            GamMan.clientId = socket.id;
        });
    }, [socket]);

    let RightKeyPressed = false;
    let LeftKeyPressed = false;

    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            if (
                event.key === 'ArrowLeft' ||
                event.key === 'a' ||
                event.key === 'A'
            ) {
                LeftKeyPressed = false;
            } else if (
                event.key === 'ArrowRight' ||
                event.key === 'd' ||
                event.key === 'D'
            ) {
                RightKeyPressed = false;
            }
            GamMan.setClientInput(LeftKeyPressed, RightKeyPressed);
        });
    });

    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (
                event.key === 'ArrowLeft' ||
                event.key === 'a' ||
                event.key === 'A'
            ) {
                LeftKeyPressed = true;
            } else if (
                event.key === 'ArrowRight' ||
                event.key === 'd' ||
                event.key === 'D'
            ) {
                RightKeyPressed = true;
            }
            //set input for the player in the input dictionary with the player id as a key
            GamMan.setClientInput(LeftKeyPressed, RightKeyPressed);
        });
    });


    //Draw the game and move the player with a tick rate of 60 times per second
    useEffect(() => {
        const tick = setInterval(() => {

            //get canvas and context
            const canvasPl = document.getElementById('cvPlayers');
            const ctxPl = canvasPl.getContext('2d');

            const canvasLi = document.getElementById('cvLines');
            const ctxLi = canvasLi.getContext('2d');

            const canvasCo = document.getElementById("cvCountdown");
            const ctxCo = canvasCo.getContext("2d");

            let varNow = new Date().getTime();
            let deltaTime = (varNow - GamMan.lastTick) / 1000;
            GamMan.lastTick = varNow;
            GamMan.drawLines(canvasLi, ctxLi);
            GamMan.drawPlayers(canvasPl, ctxPl);
            if(GamMan.countdownStarted)
            {
                GamMan.drawCountdown(canvasCo, ctxCo, (3 - Math.floor((new Date().getTime() - countDownTime) / 1000)));
            }
            GamMan.updateGameState(deltaTime, ctxLi);

        }, 1000 / 60);
        return () => clearInterval(tick);
    });
  return (
    <div>
        <div style={{left: 340, top: 20, zIndex: 4, position: "absolute", textAlign: "center"}} hidden={true} id="EndOfGame"></div>
      <canvas
        id={"cvCountdown"}
        width={boardSize}
        height={boardSize}
        style={{ zIndex: 3, position: "absolute", top: 0, left: 300 }}
      ></canvas>
      <canvas
        id={"cvPlayers"}
        width={boardSize}
        height={boardSize}
        style={{ zIndex: 2, position: "absolute", top: 0, left: 300 }}
      ></canvas>
      <canvas
        id={"cvLines"}
        width={boardSize}
        height={boardSize}
        style={{ zIndex: 1, position: "absolute", top: 0, left: 300 }}
      ></canvas>
        <Scoreboard gameManager={GamMan} />
    </div>
  );

};
export default Game;
