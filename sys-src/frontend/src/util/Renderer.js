export class Renderer {
  constructor() {}

  drawPlayers(players, boardSize, canvas, ctx) {
    //canvas.width = boardSize;
    //canvas.height = boardSize;
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

  drawLines(players, boardSize, canvas, ctx) {
    //canvas.width = boardSize;
    //canvas.height = boardSize;

    //draws the game border
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#2196f3";
    //lineWidth is the width of the border
    ctx.lineWidth = 10;
    ctx.stroke();

    players.forEach((player) => {
        //Code Source for player line: https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas?answertab=active#tab-top
        //draws the player's line
        //move to the first point
        if(player.isDrawing) {
            ctx.strokeStyle = player.lineColor;
            ctx.moveTo(player.lastX, player.lastY);
            let xc = (player.lastX + player.positionX) / 2;
            let yc = (player.lastY + player.positionY) / 2;
            ctx.quadraticCurveTo(player.positionX, player.positionY, xc, yc);
            ctx.lineWidth = player.size * 0.7;
            ctx.stroke();
        }
    });
  }


}

