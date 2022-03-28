const canvasObject = {
    width : 1000,
    height : 1000
};
const contextObject = {
    params : null
};

function gameBoardTest(){
    const testGBO = new GameBoard(10, 2, 5, 2, canvasObject, contextObject);
    console.log(testGBO); // check for correct params

    calcBrickWidth(testGBO); // check brick width calcs
    // 2 * 10 = 20
    // 1000 - 20 = 980
    // 980 / 10 = 98
    console.log("brick width test:", testGBO.brickWidth === 98, testGBO.brickWidth);


    calcBrickHeight(testGBO); // check brick height calcs
    // 2 * 2 = 4
    // 1000 / 5 - 4 = 196
    // 196 / 2 = 98
    console.log("brick height test:", testGBO.brickHeight === 98, testGBO.brickHeight);

    calcBrickXCoords(testGBO)
    // 98 / 2 = 49
    // 98 + 49 = 147
    console.log("brick xCoords test:", testGBO.xCoords[1] === 147, testGBO.xCoords);

    calcBrickYCoords(testGBO)
    // 98 / 2 = 49
    // 98 + 49 = 147
    console.log("brick yCoords test:", testGBO.yCoords[1] === 147, testGBO.yCoords);

    mergeBrickXYCoords(testGBO);
    //x: 49 + 98 * 0 = 49
    //y: 49 + 98 * 1 = 147
    console.log("brick xyCoords merge test:", testGBO.xyCoords[1][0] === 147 && testGBO.xyCoords[1][1] === 147, testGBO.xyCoords);

    createBrickArray(testGBO, Brick);
    console.log("brick array test:", testGBO.brickArray);
};
// gameBoardTest();
