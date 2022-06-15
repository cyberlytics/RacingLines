export class Renderer {
    constructor() {
    }

    draw(players, boardSize,canvas,ctx) {
        canvas.width = boardSize;
        canvas.height = boardSize;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            ctx.moveTo(player.positionStack[0].x, player.positionStack[0].y);
            ctx.strokeStyle = player.lineColor;
            let i = 1;
            for (; i < player.positionStack.length - 2; i++) {
                if(player.positionStack.length>2){
                    let xc = (player.positionStack[i].x + player.positionStack[i + 1].x) / 2;
                    let yc = (player.positionStack[i].y + player.positionStack[i + 1].y) / 2;
                    ctx.quadraticCurveTo(player.positionStack[i].x, player.positionStack[i].y, xc, yc);
                }
            }
            // curve through the last two points
            if(player.positionStack.length>2) {
                ctx.quadraticCurveTo(player.positionStack[i].x, player.positionStack[i].y, player.positionStack[i + 1].x, player.positionStack[i + 1].y);
            }
            ctx.quadraticCurveTo(player.positionX, player.positionY, player.positionX, player.positionY);
            ctx.lineWidth = player.size * 0.8;
            ctx.stroke();

            //draws the player
            ctx.beginPath();
            ctx.strokeStyle = player.circleColor;
            ctx.fillStyle = player.circleColor;
            ctx.arc(player.positionX, player.positionY, player.size / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });
    }
}