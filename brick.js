// Brick class sets defaults and allows creation of game board object

class Brick{
    constructor(x, y, width, height, lineWidth, canvas, context){
        this.canvas = canvas;
        this.context = context;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.area = this.width * this.height;
        this.lineWidth = lineWidth;

        this.halfWidth = this.width / 2 + this.lineWidth;
        this.halfHeight = this.height / 2 + this.lineWidth;

        this.life = 10;

        this.fillStyle = `rgba(10,10,255,${this.life / 10})`;
        this.strokeStyle = "black";

        this.radius = this.area / 1000
        this.ARC90 = Math.PI / 2;

        
    };

    drawBrick({context:c} = this){
        this.changeColor();

        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const widthLength = (this.width / 2) - this.radius;
        const heightLength = (this.height / 2) - this.radius;
        c.save();
        c.lineWidth = this.lineWidth;
        c.strokeStyle = this.strokeStyle;
        c.fillStyle = this.fillStyle;
        c.beginPath();
        c.translate(this.x, this.y)
        c.moveTo(0, halfHeight);
        c.lineTo(widthLength, halfHeight);
        c.arc(widthLength, heightLength, this.radius, this.ARC90, 0, true);
        c.lineTo(halfWidth, -heightLength);
        c.arc(widthLength, -heightLength, this.radius, 0, -this.ARC90, true);
        c.lineTo(-widthLength, -halfHeight);
        c.arc(-widthLength, -heightLength, this.radius, -this.ARC90, -this.ARC90 * 2, true);
        c.lineTo(-halfWidth, heightLength);
        c.arc(-widthLength, heightLength, this.radius, -this.ARC90 * 2, this.ARC90, true);
        c.closePath();
        c.fill();
        c.stroke();
        c.restore();
    };

    addLife(){};
    subLife(){
        this.life -= 2;
        // console.log(this.life);
    };

    changeColor(){
        const alpha = this.life / 10
        this.fillStyle = `rgba(0,0,255,${alpha})`;
    };
};

// Functions to calc brick properties
// Appends output to gameBoard object

// Calcs brick width
function calcBrickWidth(gbo = gameBoardObject){
    const totalCanvasWidth = gbo.canvas.width - gbo.lineWidth * gbo.colCount;
    gbo.brickWidth =  totalCanvasWidth / gbo.colCount;
};

// Calcs brick height
function calcBrickHeight(gbo = gameBoardObject){
    const totalCanvasHeight = (gbo.canvas.height / gbo.rowRatio) - (gbo.lineWidth * 2);
    gbo.brickHeight = totalCanvasHeight / gbo.rowCount;
};

// Calcs x coords for bricks center
function calcBrickXCoords(gbo = gameBoardObject){
    const xCoords = [];
    const halfWidth = gbo.brickWidth + gbo.lineWidth
    xCoords.push(halfWidth / 2 );
    for(let i = 1; i < gbo.colCount; i++){
        xCoords.push((halfWidth / 2) + (halfWidth) * i);
    }
    gbo.xCoords = xCoords;
}

// Calcs y coords for bricks center
function calcBrickYCoords(gbo = gameBoardObject){
    const yCoords = [];
    const halfHeight = gbo.brickHeight + gbo.lineWidth;
    yCoords.push(halfHeight / 2);
    for(let i = 1; i < gbo.rowCount; i++){
        yCoords.push((halfHeight / 2) + halfHeight * i);
    }
    gbo.yCoords = yCoords;
}

// Creats array of coords for all bricks
function mergeBrickXYCoords(gbo = gameBoardObject){
    const xyCoords = [];
        gbo.xCoords.forEach(x => {
            gbo.yCoords.forEach(y =>{
                xyCoords.push([x,y]);
            })
        });
        gbo.xyCoords = xyCoords;
}

// Performs all calc functions for gameBoard object
function calcBricks(gbo = gameBoardObject){
    calcBrickWidth(gbo);
    calcBrickHeight(gbo);
    calcBrickXCoords(gbo);
    calcBrickYCoords(gbo);
    mergeBrickXYCoords(gbo);
}

// Creates array of Brick objects from Brick class
function createBrickArray(gbo = gameBoardObject, BC = BrickClass){
    calcBricks(gbo)
    const brickArray = [];
    gbo.xyCoords.forEach(e => {
        brickArray.push(
            new BC(
                e[0], //xCoord
                e[1], //yCoord
                gbo.brickWidth,
                gbo.brickHeight,
                gbo.lineWidth,
                gbo.canvas,
                gbo.context
            )
        );
    });
    gbo.brickArray = brickArray;
}

function lifeCheck(gbo = gameBoardObject){
    const brickArray = gbo.brickArray;
    brickArray.forEach((e, i, a) => {
        if(e.life <= 0){
            a.splice(i, 1);
        };
    });
};

// Drawing functions for brick objects
function drawBrickArray(gbo = gameBoardObject){
    gbo.brickArray.forEach(e => e.drawBrick());
};

function animateBricks(gbo = gameBoardObject){
    lifeCheck(gbo);
    drawBrickArray(gbo);
}