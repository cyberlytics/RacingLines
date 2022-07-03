export class Renderer {
  constructor() {}

  drawPlayers(players, boardSize, canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach((player) => {
      //draws the player
      ctx.beginPath();
      ctx.strokeStyle = player.circleColor;
      ctx.fillStyle = player.circleColor;
      ctx.arc(
        player.positionX,
        player.positionY,
        player.size / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    });
  }

  borderDrawn = false;

  drawLines(players, boardSize, canvas, ctx) {
      if(!this.borderDrawn)
      {
          ctx.beginPath();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 10;
          //draws the game border
          ctx.rect(0, 0, canvas.width, canvas.height);
          //lineWidth is the width of the border
        ctx.closePath();
          ctx.stroke();
          this.borderDrawn = true;
      }

    players.forEach((player) => {
      //Code Source for player line: https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas?answertab=active#tab-top
      //draws the player's line
      //move to the first point
      if (player.isDrawing) {
        ctx.beginPath();
        ctx.strokeStyle = player.circleColor;
        ctx.moveTo(player.lastX, player.lastY);
        let xc = (player.lastX + player.positionX) / 2;
        let yc = (player.lastY + player.positionY) / 2;
        ctx.quadraticCurveTo(player.positionX, player.positionY, xc, yc);
        ctx.lineWidth = player.size * 0.7;
        ctx.stroke();
      }
    });
  }

  drawCountdown(players, boardSize, canvas, ctx, number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draws an arrow in the player direction for each player in the game
    players.forEach((player) => {
      ctx.beginPath();
      let arrowLength = 50;
      let arrowHeadLength = 15;
      ctx.strokeStyle = player.circleColor;
      ctx.fillStyle = player.circleColor;
      ctx.lineWidth = player.size * 0.3;
      ctx.moveTo(player.positionX, player.positionY);
      ctx.lineTo(
        player.positionX + arrowLength * Math.cos(player.directionAngle),
        player.positionY + arrowLength * Math.sin(player.directionAngle)
      );
      ctx.stroke();

      //draw arrowhead at the end of the line
      ctx.beginPath();
      ctx.moveTo(
        player.positionX +
          (arrowLength + arrowHeadLength) * Math.cos(player.directionAngle),
        player.positionY +
          (arrowLength + arrowHeadLength) * Math.sin(player.directionAngle)
      );
      ctx.lineTo(
        player.positionX +
          arrowLength * Math.cos(player.directionAngle - Math.PI / 20),
        player.positionY +
          arrowLength * Math.sin(player.directionAngle - Math.PI / 20)
      );
      ctx.lineTo(
        player.positionX +
          arrowLength * Math.cos(player.directionAngle + Math.PI / 20),
        player.positionY +
          arrowLength * Math.sin(player.directionAngle + Math.PI / 20)
      );
      ctx.closePath();
      ctx.fill();

      //draws the countdown
      ctx.fillStyle = "black";
      ctx.font = "bold 125px Arial";
      ctx.globalAlpha = 0.25;
      ctx.textAlign = "center";
      ctx.fillText(number, canvas.width / 2, canvas.height / 2);
      ctx.globalAlpha = 1;

      //draws the player's name
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = player.circleColor;
      ctx.fillText(player.name, player.positionX - 20, player.positionY - 20);
    });
  }

  clearCountdown(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  clearPlayers(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  clearLines(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
