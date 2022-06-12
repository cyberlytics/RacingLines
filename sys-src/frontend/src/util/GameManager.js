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
        this.timeSinceLastHole = new Date().getTime();
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
            this.checkCollision(player);
            this.checkCollisionWithLines(player, ctx);
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
    checkCollisionWithLines(player, ctx) {
        let pxTop = ctx.getImageData(player.positionX, player.positionY - (player.size+1), 1, 1);
        let pxBottom = ctx.getImageData(player.positionX, player.positionY + (player.size+1), 1, 1);
        let pxLeft = ctx.getImageData(player.positionX - (player.size+1), player.positionY, 1, 1);
        let pxRight = ctx.getImageData(player.positionX + (player.size+1), player.positionY, 1, 1);
        let sin = Math.sin(player.directionAngle);
        let cos = Math.cos(player.directionAngle);
        //dir -> down
        if(sin >= 0 && cos >= -0.5 && cos <= 0.5)
        {
            if(!this.pixelIsWhite(pxBottom) || !this.pixelIsWhite(pxRight) || !this.pixelIsWhite(pxLeft)) player.isAlive = false;
        }
        //dir -> up
        else if(sin <= 0 && cos >= -0.5 && cos <= 0.5)
        {
            if(!this.pixelIsWhite(pxTop) || !this.pixelIsWhite(pxRight) || !this.pixelIsWhite(pxLeft)) player.isAlive = false;
        }
        //dir -> left
        else if(cos <= 0 && sin > -0.5 && sin < 0.5)
        {
            if(!this.pixelIsWhite(pxBottom) || !this.pixelIsWhite(pxTop) || !this.pixelIsWhite(pxLeft)) player.isAlive = false;
        }
        //dir -> right
        else if(cos >= 0 && sin > -0.5 && sin < 0.5)
        {
            if(!this.pixelIsWhite(pxBottom) || !this.pixelIsWhite(pxRight) || !this.pixelIsWhite(pxTop)) player.isAlive = false;
        }
    }

    pixelIsWhite(pixel) {
        for(let i = 0; i < 4; i++){
            if(pixel.data[i] != 0) return false;
        }
        return true;
    }

    drawGame(canvas, ctx) {
        this.Renderer.draw(this.players, this.boardSize,canvas, ctx);
    }
}