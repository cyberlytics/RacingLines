import React, {useReducer, useRef} from 'react';
import {Stage, Sprite, Container, Graphics, useTick} from '@inlet/react-pixi'
const PIXI = require('pixi.js');

function KeyBindings(){
  // Set up Pixi.js
  var renderer = PIXI.autoDetectRenderer(1500,600);
  document.body.appendChild(renderer.view);


  // Create the stage
  var stage = new PIXI.Container();
  
  // Set the width and height of our boxes
  var boxWidth = 10 //renderer.width / 10;
  var boxHeight = 10 //enderer.height / 10;


  // Create the "player"
  var playerBox = new PIXI.Graphics();

  // Blue color
  playerBox.beginFill(0x3498db); 
  playerBox.drawCircle(50, 50, boxWidth, boxHeight);
  playerBox.endFill();

  // Create the target
  /*var goalBox = new PIXI.Graphics();
  //goalBox.beginFill(0xe74c3c); // Red color
 // goalBox.drawRect(0, 0, boxWidth, boxHeight);
  goalBox.lineStyle(5, 0xe74c3c, 5);
  goalBox.drawShape();
  //goalBox.endFill();*/

  
  // Add boxes to the stage
  stage.addChild(playerBox);
  //stage.addChild(goalBox);

  // Add the 'keydown' event listener to our document
  document.addEventListener('keydown', onKeyDown);

  // Spawn our target
  //goalBoxSpawn();

  animate();

  var p = 0; // Percentage

  function animate() {
     // Render the stage
      renderer.render(stage);

      // Check if your player collides with the target
      //checkPosition();
      requestAnimationFrame(animate);
    }

  /*function goalBoxSpawn() {
      // Spawns the target at a random position on our stage

      // Create two random points on our stage
      var randomX = Math.floor((Math.random() * 10) + 0);
      var randomY = Math.floor((Math.random() * 10) + 0);

      // Set the position of our target
      goalBox.position.x = boxWidth * randomX;
      goalBox.position.y = boxHeight * randomY;

  }*/

  /*function checkPosition() {
      // If the player and target are at the same position, spawn the target in another position
      if (goalBox.position.x === playerBox.position.x && goalBox.position.y === playerBox.position.y) {
          goalBoxSpawn();
      }
  }*/

  function onKeyDown(key) {
      // W Key is 87 & Up arrow is 87
      if (key.keyCode === 87 || key.keyCode === 38) {
          // If the W key or the Up arrow is pressed, move the player up.
          if (playerBox.position.y != 0) {
              // Don't move up if the player is at the top of the stage
              playerBox.position.y -= boxHeight;
          }
      }

      // S Key is 83 & Down arrow is 40
      if (key.keyCode === 83 || key.keyCode === 40) {
          // If the S key or the Down arrow is pressed, move the player down.
          if (playerBox.position.y != renderer.height - boxHeight) {
              // Don't move down if the player is at the bottom of the stage
              playerBox.position.y += boxHeight;
          }
      }

      // A Key is 65 & Left arrow is 37
      if (key.keyCode === 65 || key.keyCode === 37) {
          // If the A key or the Left arrow is pressed, move the player to the left.
          if (playerBox.position.x != 0) {
              // Don't move to the left if the player is at the left side of the stage
              playerBox.position.x -= boxWidth;
          }
      }

      // D Key is 68 & Right arrow is 39
      if (key.keyCode === 68 || key.keyCode === 39) {
          // If the D key or the Right arrow is pressed, move the player to the right.
          if (playerBox.position.x != renderer.width - boxWidth) {
              // Don't move to the right if the player is at the right side of the stage
              playerBox.position.x += boxWidth;
          }
      }
    }

}

export default KeyBindings;