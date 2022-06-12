import {Renderer} from './Renderer';
import {ServerCommunicationHelper} from './ServerCommunicationHelper';
import {Player} from './Player';
import React from "react";

export class GameManager{
    constructor(Socket, boardSize) {
        this.ServerCommunicationHelper = new ServerCommunicationHelper(Socket);
        this.Renderer = new Renderer();
        this.players = [];
        this.roundCount = 0;
        this.boardSize = boardSize;
        this.inputDictionary = {};
        this.timeSinceLastHole = new Date().getTime();
    }

    //addPlayerfunction


    setUpRound(){
        this.inputDictionary[this.clientId] = {RightKeyPressed: false,LeftKeyPressed: false};
        this.inputDictionary[this.clientId] = {RightKeyPressed: false,LeftKeyPressed: false};
        this.ServerCommunicationHelper.startGame();
    }

    //update the game state
    updateGameState(deltaTime) {
        this.players.forEach(player => {
            player.updateDirection(this.inputDictionary[player.id].RightKeyPressed, this.inputDictionary[player.id].LeftKeyPressed);
            player.move(deltaTime);
            this.checkCollision(player);
            //this.checkCollisionWithLines(player);
        });
    }

    endRound(){
        this.roundCount +=1;
    }

    resetRound() {
        this.players.forEach(player => {
            player.isAlive = true;
            player.segmentCount = 0;
            player.directionAngle = 0;
            player.score = 0;
            player.positionStack = [];
        });
    }

    startRound(players, boardSize){
        this.setUpRound(players, boardSize);
        this.firstTick = new Date().getTime();
        this.lastTick = new Date().getTime();
    }

    //check if the game is over
    isGameOver() {
        if(this.roundCount===3){
            return true;
        }
    }

    //check if the player is colliding with the walls
    checkCollision(player) {
        if (player.positionX < 0 || player.positionX > this.boardSize || player.positionY < 0 || player.positionY > this.boardSize) {
            player.isAlive = false;
        }
    }

    //check if the player is colliding with the lines drawn to the canvas
    checkCollisionWithLines() {
        this.players.forEach(player => {
        });
    }

    drawGame(canvas, ctx) {
        this.Renderer.draw(this.players, this.boardSize,canvas, ctx);
    }
}