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
        console.log("Player State Buffer: " + player.playerStateBuffer.length);
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
          this.checkCollision(player);
          this.checkCollisionWithLines(player, ctx);
        } else if (player.id === this.clientId) {
          player.updateDirection(
            this.clientInput.InputLeft,
            this.clientInput.InputRight
          );
          player.move(deltaTime);
          this.checkCollision(player);
          this.checkCollisionWithLines(player, ctx);
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

  //check if the player is colliding with the walls
  checkCollision(player) {
    if (
      player.positionX < 0 ||
      player.positionX > this.boardSize ||
      player.positionY < 0 ||
      player.positionY > this.boardSize
    ) {
      player.isAlive = false;
    }
  }

  //check if the player is colliding with the lines drawn to the canvas
  checkCollisionWithLines(player, ctx) {
    let pxTop = ctx.getImageData(
      player.positionX,
      player.positionY - (player.size + 1),
      1,
      1
    );
    let pxBottom = ctx.getImageData(
      player.positionX,
      player.positionY + (player.size + 1),
      1,
      1
    );
    let pxLeft = ctx.getImageData(
      player.positionX - (player.size + 1),
      player.positionY,
      1,
      1
    );
    let pxRight = ctx.getImageData(
      player.positionX + (player.size + 1),
      player.positionY,
      1,
      1
    );
    let sin = Math.sin(player.directionAngle);
    let cos = Math.cos(player.directionAngle);
    //dir -> down
    if (sin >= 0 && cos >= -0.5 && cos <= 0.5) {
      /*
            console.log("down");
            pxBottom.data[0] = 255;
            pxBottom.data[1] = 255;
            pxBottom.data[2] = 255;
            pxBottom.data[3] = 255;
            ctx.putImageData(pxBottom, player.positionX, player.positionY + (player.size+1));*/
      if (
        !this.pixelIsWhite(pxBottom) ||
        !this.pixelIsWhite(pxRight) ||
        !this.pixelIsWhite(pxLeft)
      )
        player.isAlive = false;
    }
    //dir -> up
    else if (sin <= 0 && cos >= -0.5 && cos <= 0.5) {
      /*
            console.log("up");
            pxTop.data[0] = 255;
            pxTop.data[1] = 255;
            pxTop.data[2] = 255;
            pxTop.data[3] = 255;
            ctx.putImageData(pxTop, player.positionX, player.positionY - (player.size+1));*/
      if (
        !this.pixelIsWhite(pxTop) ||
        !this.pixelIsWhite(pxRight) ||
        !this.pixelIsWhite(pxLeft)
      )
        player.isAlive = false;
    }
    //dir -> left
    else if (cos <= 0 && sin > -0.5 && sin < 0.5) {
      /*
            console.log("left");
            pxLeft.data[0] = 255;
            pxLeft.data[1] = 255;
            pxLeft.data[2] = 255;
            pxLeft.data[3] = 255;
            ctx.putImageData(pxLeft, player.positionX - (player.size+1), player.positionY);*/
      if (
        !this.pixelIsWhite(pxBottom) ||
        !this.pixelIsWhite(pxTop) ||
        !this.pixelIsWhite(pxLeft)
      )
        player.isAlive = false;
    }
    //dir -> right
    else if (cos >= 0 && sin > -0.5 && sin < 0.5) {
      /*
            console.log("right");
            pxRight.data[0] = 255;
            pxRight.data[1] = 255;
            pxRight.data[2] = 255;
            pxRight.data[3] = 255;
            ctx.putImageData(pxRight, player.positionX + (player.size+1), player.positionY);*/
      if (
        !this.pixelIsWhite(pxBottom) ||
        !this.pixelIsWhite(pxRight) ||
        !this.pixelIsWhite(pxTop)
      )
        player.isAlive = false;
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
