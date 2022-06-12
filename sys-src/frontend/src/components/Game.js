import {useCallback, useEffect} from "react";
import {GameManager} from "../util/GameManager";
import io from "socket.io-client";
import {useSearchParams} from "react-router-dom";
import {Player} from "../util/Player";


const socket = io.connect("http://localhost:3001");

const Game = () => {

    // boardSize before prop is passed in
    let boardSize = 800;

    const GamMan = new GameManager(socket, boardSize);

    //get room from url and join room
    const [roomParam] = useSearchParams();
    const room = roomParam.get("room");
    GamMan.ServerCommunicationHelper.joinRoom(room);

    //input variables for the client
    let RightKeyPressed = false;
    let LeftKeyPressed = false;

    useEffect(() => {
        socket.on('playerInput', (data) => {
            LeftKeyPressed = data.inputLeft;
            RightKeyPressed = data.inputRight;
            GamMan.inputDictionary[data.playerId] = {LeftKeyPressed, RightKeyPressed};
        });

        socket.on('gameStarted', (data) => {
            let clientDictionary = data.clientDictionary;

            Object.entries(clientDictionary).forEach(([key, value]) => {
                GamMan.players.push(new Player("Player" , key, "pink", "blue",value.x, value.y, value.direction));
                GamMan.inputDictionary[key] = {LeftKeyPressed: false, RightKeyPressed: false};
            });
        });

        socket.on("connect", () => {
            GamMan.clientId = socket.id;
        });
    }, [socket]);



    //get input for left and right from the keyboard for the player direction
    useEffect(() => {
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
                LeftKeyPressed = false;
            } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
                RightKeyPressed = false;
            }
            GamMan.inputDictionary[GamMan.clientId]={LeftKeyPressed, RightKeyPressed};
            GamMan.ServerCommunicationHelper.sendInput(GamMan.inputDictionary[GamMan.clientId].LeftKeyPressed, GamMan.inputDictionary[GamMan.clientId].RightKeyPressed, GamMan.clientId);
        });
    });

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "w") {
                GamMan.ServerCommunicationHelper.startGame()
            }
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
            GamMan.inputDictionary[GamMan.clientId]={LeftKeyPressed, RightKeyPressed};
            GamMan.ServerCommunicationHelper.sendInput(GamMan.inputDictionary[GamMan.clientId].LeftKeyPressed, GamMan.inputDictionary[GamMan.clientId].RightKeyPressed, GamMan.clientId);
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
            GamMan.updateGameState(deltaTime, ctx);
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