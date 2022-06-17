import { Renderer } from "./Renderer";
import { ServerCommunicationHelper } from "./ServerCommunicationHelper";
import { Player } from "./Player";
import React from "react";
import { compareArraysAsSet } from "@testing-library/jest-dom/dist/utils";

export class GameManager {
  constructor(Socket, boardSize) {
    this.ServerCommunicationHelper = new ServerCommunicationHelper(Socket);
    this.Renderer = new Renderer();
    this.players = [];
    this.roundCount = 0;
    this.boardSize = boardSize;
    this.clientInput = { InputLeft: false, InputRight: false };
    this.timeSinceLastHole = new Date().getTime();
    this.clientId = "";
    this.gameRunning = false;
  }

  setUpRound() {
    if (this.gameRunning === false) this.ServerCommunicationHelper.startGame();
    this.gameRunning = true;
  }

  //update the game state
  updateGameState(deltaTime, ctx) {
    if (this.gameRunning) {
      this.players.forEach((player) => {
        if (
          player.id !== this.clientId &&
          player.playerStateBuffer.length > 0
        ) {
          let playerState = player.playerStateBuffer.shift();
          player.setPlayerState(
            playerState.positionX,
            playerState.positionY,
            playerState.isDrawing
          );
          this.checkCollision(player, ctx);
          if(this.randomNum(1, 60) == 1) this.stopDrawing(player, this.randomNum(100, 300));
        } else if (player.id === this.clientId) {
          player.updateDirection(
            this.clientInput.InputLeft,
            this.clientInput.InputRight
          );
          player.move(deltaTime);
          this.checkCollision(player, ctx);
          if(this.randomNum(1, 60) == 1) this.stopDrawing(player, this.randomNum(100, 300));
          this.ServerCommunicationHelper.sendClientPlayerState(
            player.positionX,
            player.positionY,
            player.isDrawing
          );
        }
        //if(0) this.stopDrawing(player, this.randomNum(100, 300));
      });
    }
  }

  setClientInput(inputLeft, inputRight) {
    this.clientInput.InputLeft = inputLeft;
    this.clientInput.InputRight = inputRight;
    console.log("input: " + inputLeft + " " + inputRight);
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

  startRound(players, boardSize) {
    this.setUpRound(players, boardSize);
    this.firstTick = new Date().getTime();
    this.lastTick = new Date().getTime();
  }

    //check if the player is colliding with the lines drawn to the canvas
    checkCollision(player, ctx) {
        for (let i = 0; i < 5; i++) {
            let rad = player.directionAngle + (Math.PI / 16) * i;
            let posX = player.positionX + (player.size - 3) * Math.cos(rad);
            let posY = player.positionY + (player.size - 3) * Math.sin(rad);
            let px = ctx.getImageData(posX, posY, 1, 1);
            if (!this.pixelIsWhite(px)) {
                player.isAlive = false;
                return;
            }
            if (i > 0) {
                rad = player.directionAngle - (Math.PI / 16) * i;
                posX = player.positionX + (player.size - 3) * Math.cos(rad);
                posY = player.positionY + (player.size - 3) * Math.sin(rad);
                px = ctx.getImageData(posX, posY, 1, 1);
                if (!this.pixelIsWhite(px)) {
                    player.isAlive = false;
                    return;
                }
            }
        }
    }

  pixelIsWhite(pixel) {
    for (let i = 0; i < 4; i++) {
      if (pixel.data[i] !== 0) return false;
    }
    return true;
  }

  drawPlayers(canvas, ctx) {
    this.Renderer.drawPlayers(this.players, this.boardSize, canvas, ctx);
  }

  drawLines(canvas, ctx) {
    this.Renderer.drawLines(this.players, this.boardSize, canvas, ctx);
  }
}
