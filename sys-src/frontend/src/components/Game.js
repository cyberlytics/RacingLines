import {useCallback, useEffect} from "react";
import {GameManager} from "../util/GameManager";
import io from "socket.io-client";
import {useSearchParams} from "react-router-dom";


const socket = io.connect("http://localhost:3001");

const Game = () => {
    // boardSize before prop is passed in
    let boardSize = 800;

    const GamMan = new GameManager(socket, boardSize);

    //get room from url and join room
    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");
    GamMan.ServerCommunicationHelper.joinRoom(room);

    /*
    //socket io useEffect
    useEffect(() => {

        this.Socket.on('clientId', (data) => {
            GamMan.clientId = data.clientId;
        });

        let playerArr = {};
        this.Socket.on('playerArray', (playerArray) => {
            playerArr = playerArray;
        });

        let playerInput = {};
        this.Socket.on('playerInput', (input) => {
            playerInput = input;
        });

        let playerDictionary= {};
        this.Socket.on('startGame', (data) => {
            playerDictionary = data;
        });

        let playerId;
        this.Socket.on("connect", () => {
            console.log("connected to server");
            playerId = this.Socket.id;
        });
    }, [socket])*/


    //create game
    GamMan.startRound();

    //input variables for the client
    let RightKeyPressed = false;
    let LeftKeyPressed = false;

    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
                LeftKeyPressed = false;
            } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
                RightKeyPressed = false;
            }
            GamMan.inputDictionary[GamMan.players[0].id]={LeftKeyPressed, RightKeyPressed};
        });
    });

    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
                LeftKeyPressed = true;
            } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
                RightKeyPressed = true;
            }
            //set input for the player in the input dictionary with the player id as a key
            GamMan.inputDictionary[GamMan.players[0].id]={LeftKeyPressed, RightKeyPressed};
        });
    });

    //Game loop
    //Draw the game and move the player with a tick rate of 60 times per second
    useEffect(() => {
        const tick = setInterval(() => {
            //get canvas and context
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');

            let varNow =  new Date().getTime();
            let deltaTime = (varNow - GamMan.lastTick) / 1000;
            GamMan.lastTick = varNow;
            GamMan.updateGameState(deltaTime, RightKeyPressed, LeftKeyPressed);
            GamMan.drawGame(canvas, ctx);

        }, 1000 / 60);
        return () => clearInterval(tick);
    });

    //useEffect for the player
    //add the player position of all players to the position stack

    useEffect(() => {
        const tick = setInterval(() => {
            GamMan.players.forEach((player) => {
                if (player.isAlive === true) {
                    player.positionStack.push({
                        x: player.positionX,
                        y: player.positionY,
                        segment: player.segmentCount
                    });
                }
            });
        }, 1000 / 15);
        return () => clearInterval(tick);
    });

    return (
        <header>
            <canvas></canvas>
        </header>
    )
}
export default Game;