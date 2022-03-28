resizeCanvasFull();


const gameBoard = new GameBoard(10,5,5,2);
createBrickArray(gameBoard, Brick);
const ballArray = createBallArray(3);
const paddle = createPaddle(gameBoard);

function loop(){
    window.requestAnimationFrame(loop);

    checkCollisions(ballArray, gameBoard.brickArray, paddle);
    clearCanvas();
    animateBallArray(ballArray);
    animateBricks(gameBoard);
    paddle.animatePaddle();
};

loop();