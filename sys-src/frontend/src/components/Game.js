import React, { useEffect } from 'react';
import { GameManager } from '../util/GameManager';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import { Player } from '../util/Player';
import Scoreboard from './Scoreboard';

const Game = () => {
    // default boardSize
    const boardSize = 800;
    const socket = io.connect(process.env.REACT_APP_IPAddress + ':3001');
    const GamMan = new GameManager(socket, boardSize);

    //get room from url and join room
    const [roomParam] = useSearchParams();
    const room = roomParam.get('room');
    GamMan.ServerCommunicationHelper.joinRoom(room);

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
            Object.entries(clientDictionary).forEach(([key, value]) => {
                let player = new Player(
                    'player',
                    key,
                    'green',
                    'blue',
                    value.x,
                    value.y,
                    value.direction
                );
                player.addToPlayerStateBuffer(value.x, value.y, true);
                GamMan.players.push(player);
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

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w') {
                GamMan.setUpRound();
            }
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

    useEffect(() => {
        console.log('useeffect addscore');
        GamMan.players.forEach((player) => {
            player.score = player.score + 10;
            console.log(player.score);
        });
    });

    function AddScore(value) {
        GamMan.players.forEach((player) => {
            player.addScore(value);
            console.log(player.score);
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            AddScore(10);
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <div>
            <canvas
                id={'cvPlayers'}
                width={boardSize}
                height={boardSize}
                style={{ zIndex: 2, position: 'absolute', top: 0, left: 0 }}
            ></canvas>
            <canvas
                id={'cvLines'}
                width={boardSize}
                height={boardSize}
                style={{ zIndex: 1, position: 'absolute', top: 0, left: 0 }}
            ></canvas>

            <div style={{ position: 'absolute', top: 300, left: 700 }}>
                <Scoreboard gameManager={GamMan} />
            </div>
        </div>
    );
};
export default Game;
