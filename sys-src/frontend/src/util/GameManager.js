import {Renderer} from './Renderer';
import {ServerCommunicationHelper} from './ServerCommunicationHelper';
import {Player} from './Player';
import React from "react";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

export class GameManager{
    constructor(Socket, boardSize) {
        this.ServerCommunicationHelper = new ServerCommunicationHelper(Socket);
        this.Renderer = new Renderer();
        this.players = [];
        this.roundCount = 0;
        this.boardSize = boardSize;
        this.inputDictionary = {};
        this.timeAtLastHole = new Date().getTime();
    }

    //addPlayerfunction
    setUpRound(){
        this.inputDictionary[this.clientId] = {RightKeyPressed: false,LeftKeyPressed: false};
        this.inputDictionary[this.clientId] = {RightKeyPressed: false,LeftKeyPressed: false};
        this.ServerCommunicationHelper.startGame();
    }

    //update the game state
    updateGameState(deltaTime, ctx) {
        this.players.forEach(player => {
            player.updateDirection(this.inputDictionary[player.id].RightKeyPressed, this.inputDictionary[player.id].LeftKeyPressed);
            player.move(deltaTime);
            this.checkCollisionWithLines(player, ctx);
            //if(this.randomNum(1, 40) == 1) this.stopDrawing(player, this.randomNum(100, 300));
        });
    }

    randomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    stopDrawing(player, time) {
        player.isDrawing = false;
        setTimeout(this.resumeDrawing, time, player);
    }

    resumeDrawing(player) {
        player.isDrawing = true;
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

    //check if the player is colliding with the lines drawn to the canvas
    checkCollisionWithLines(player, ctx) {
        for(let i = 0; i < 5; i++) {
            let rad = player.directionAngle + (Math.PI / 16)*i;
            let posX = player.positionX + (player.size-1) * Math.cos(rad);
            let posY = player.positionY + (player.size-1) * Math.sin(rad);
            let px = ctx.getImageData(posX, posY, 1, 1);
            if(!this.pixelIsWhite(px))
            {
                player.isAlive = false;
                return;
            }
            if(i > 0)
            {
                rad = player.directionAngle - (Math.PI / 16)*i;
                posX = player.positionX + (player.size-1) * Math.cos(rad);
                posY = player.positionY + (player.size-1) * Math.sin(rad);
                px = ctx.getImageData(posX, posY, 1, 1);
                if(!this.pixelIsWhite(px))
                {
                    player.isAlive = false;
                    return;
                }
            }
        }
    }

    pixelIsWhite(pixel) {
        for(let i = 0; i < 4; i++){
            if(pixel.data[i] != 0) return false;
        }
        return true;
    }

    drawPlayers(canvas, ctx) {
        this.Renderer.drawPlayers(this.players, this.boardSize,canvas, ctx);
    }

    drawLines(canvas, ctx) {
        this.Renderer.drawLines(this.players, this.boardSize,canvas, ctx);
    }
}