// GameBoard class sets defaults and allows creation of game board object

class GameBoard{ 
    constructor(colCount, rowCount, rowRatio, lineWidth, canvasObject, contextObject){
        this.canvas = canvasObject || document.querySelector("canvas"); //default canvas element
        this.context = contextObject || this.canvas.getContext("2d"); //default context

        this.colCount = colCount || 5; //total amount of columns
        this.rowCount = rowCount || 2; //total amount of rows
        this.rowRatio = rowRatio || 5; //ratio of canvas height to total rows height

        this.lineWidth = lineWidth || 4; //brick line width used in size calculations
    };
};            

function checkBallBrickCollision(ballObject, brickObject){
    const ballX = ballObject.x;
    const ballY = ballObject.y;
    const brickL = brickObject.x - brickObject.halfWidth;
    const brickR = brickObject.x + brickObject.halfWidth;
    const brickT = brickObject.y - brickObject.halfHeight;
    const brickB = brickObject.y + brickObject.halfHeight;
    if(ballX > brickL && ballX < brickR && 
        ballY > brickT && ballY < brickB){
            ballObject.reverseY();
            brickObject.subLife();
        }
};

function checkCollisions(ballArray, brickArray, paddleObject){
   
    ballArray.forEach(e => {
        brickArray.forEach(f => {
            checkBallBrickCollision(e, f);
        })
    });

    for(let i = 0; i < ballArray.length; i++){
        for(let j = i + 1; j < ballArray.length; j++){
            checkBallBallCollision(ballArray[i], ballArray[j]);
        };
    };

    ballArray.forEach(e => {
        checkBallPaddleCollision(e, paddleObject);
    });
};

function checkBallBallCollision(ballObjectA, ballObjectB){
    const PADDING = 1.30;
    const margin = (ballObjectA.radius + ballObjectB.radius) * PADDING;
    if(Math.abs(ballObjectA.x - ballObjectB.x) < margin){
        if(Math.abs(ballObjectA.y - ballObjectB.y) < margin){
            ballObjectA.reverseX();
            ballObjectB.reverseY();
        }
    };
};

function checkBallPaddleCollision(ballObject, paddleObject){
    if(ballObject.y < paddleObject.y + paddleObject.lineWidth &&
        ballObject.y > paddleObject.y - paddleObject.lineWidth){
            if(ballObject.x > paddleObject.x - paddleObject.halfWidth &&
                ballObject.x < paddleObject.x + paddleObject.halfWidth){
                    ballObject.reverseY();
                    console.log("hit");
                }
        }
};


// function checkBallCollision(gameBoardObject, ballObject, paddleObject){
//     const x = ballObject[0].x
//     const y = ballObject[0].y
//     gameBoardObject.brickArray.forEach((e, i, a) => {
//         const xTop = e.x + e.halfWidth;
//         const xBot = e.x - e.halfWidth;
//         const yTop = e.y + e.halfHeight;
//         const yBot = e.y - e.halfHeight;
//         if(x > xBot && x < xTop && y > yBot && y < yTop){
//             ballObject[0].reverseY();
//             e.fillStyle = "#55555550";
//             a.splice(i, 1);
//         };
//     });
//     const paddleY = paddleObject.y;
//     const paddleL = paddleObject.x - paddleObject.halfWidth;
//     const paddleR = paddleObject.x + paddleObject.halfWidth;

//     if(y < paddleY + 10 && y > paddleY -10){
//         if(x < paddleR && x > paddleL){
//             ballObject[0].randomX();
//             ballObject[0].randomY();
//             ballObject[0].reverseY();
//         };
        
//     };
// };