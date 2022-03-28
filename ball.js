class Ball{

    FULLARC = Math.PI * 2;
    RADIUSRATIO = 50000;
    LINEWIDTH = 2

    constructor(){

        //helper properties
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvasArea = this.canvas.width * this.canvas.height;

        //ball position and velocity
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.xVelocity = fxrand() * 5;
        this.yVelocity = fxrand() * 2 + 3;

        //ball properties
        this.radius = Math.floor(this.canvasArea / this.RADIUSRATIO);
        this.strokeStyle = "#333";
    };

    //Drawing functions
    drawBall({ context } = this){
        context.save();
        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.strokeStyle;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, this.FULLARC);
        context.stroke();
        context.restore();
    };

    //Movement functions
    moveBall(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    };

    reverseX(){
        this.xVelocity *= -1;
    };

    reverseY(){
        this.yVelocity *= -1;
    };

    randomX(){
        fxrand() > 0.5 ? this.xVelocity *= 1.1 : this.xVelocity *= 0.9;
    };

    randomY(){
        fxrand() > 0.5 ? this.yVelocity *= 1.1 : this.yVelocity *= 0.9;
    };

    checkBoundaries(){
        const ballEdge = this.radius + this.LINEWIDTH;

        if(this.x + ballEdge > this.canvas.width ||
            this.x - ballEdge < 0){
                this.reverseX();
            };

        if(this.y + ballEdge > this.canvas.height ||
            this.y - ballEdge < 0){
                this.reverseY();
            };

    };

    //Animation functions
    animateBall(){
        this.checkBoundaries();
        this.moveBall();
        this.drawBall();
    };
};

function createBallArray(quantity){
    const ballArray = [];
    for(let i = 0; i < quantity; i++){
        ballArray.push(new Ball());
    };
    return ballArray;
};

function animateBallArray(ballArray){
    ballArray.forEach(e => e.animateBall());
};