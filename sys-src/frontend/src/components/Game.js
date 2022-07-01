import React, { useEffect } from 'react';
import { GameManager } from '../util/GameManager';
import io from 'socket.io-client';
import { useSearchParams, useLocation  } from 'react-router-dom';
import { Player } from '../util/Player';
import Scoreboard from './Scoreboard';


const Game = () => {

    // default boardSize
    const boardSize = 800;

    const socket = io.connect(process.env.REACT_APP_IPAddress + ':3001');

    const GamMan = new GameManager(socket, boardSize);

    const location = useLocation();
    const player = {
        Id: socket.id,
        Name: location.state.Name,
        PlayerColor: location.state.PlayerColor,
        LineColor: location.state.LineColor,
        CanvasSize: location.state.CanvasSize,
        GameTempo: location.state.GameTempo,
    };

    //get room from url and join room
    const [roomParam] = useSearchParams();
    const room = roomParam.get('room');
    GamMan.ServerCommunicationHelper.joinRoom(room, player);

    const timestamp = location.state.timestamp;

    /*
    useEffect(() => {
        const tick = setInterval(() => {
            if(new Date().getTime() >= timestamp)
            {
                GamMan.setUpRound();
                clearInterval(tick);
            }
        }, 1000 / 20);
        return () => clearInterval(tick);
    });*/

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w') {
                GamMan.setUpRound();
            }
        });
    });

    useEffect(() => {

        socket.on('newPlayerState', (data) => {
            for (let i = 0; i < GamMan.players.length; i++) {
                if (GamMan.players[i].id === data.playerId) {
                    //console.log('updating player');
                    GamMan.players[i].addToPlayerStateBuffer(
                        data.positionX,
                        data.positionY,
                        data.isDrawing
                    );
                }
            }
        });

        socket.on('gameStarted', (data) => {
            let clientDictionary = data.clientDictionary;
            console.log(clientDictionary);
            Object.entries(clientDictionary).forEach(([key, value]) => {
                console.log("key");
                console.log(key);
                console.log("value");
                console.log(value);

                let player = new Player(
                    value.player.Name,
                    key,
                    value.player.PlayerColor,
                    value.player.LineColor,
                    value.x,
                    value.y,
                    value.direction
                );
                player.addToPlayerStateBuffer(value.x, value.y, true);
                GamMan.addplayer(player);
                player.addScore(0);
                GamMan.gameRunning = true;
            });
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

            let varNow = new Date().getTime();
            let deltaTime = (varNow - GamMan.lastTick) / 1000;
            GamMan.lastTick = varNow;
            GamMan.drawLines(canvasLi, ctxLi);
            GamMan.drawPlayers(canvasPl, ctxPl);
            GamMan.updateGameState(deltaTime, ctxLi);
        }, 1000 / 60);
        return () => clearInterval(tick);
    });

    return (
        <div>
            <canvas
                id={'cvPlayers'}
                width={boardSize}
                height={boardSize}
                className={'gameCanvas'}
                style={{ zIndex: 2 }}
            ></canvas>
            <canvas
                id={'cvLines'}
                width={boardSize}
                height={boardSize}
                className={'gameCanvas'}
                style={{ zIndex: 1 }}
            ></canvas>
            <Scoreboard gameManager={GamMan} />
        </div>
    );
};
export default Game;
