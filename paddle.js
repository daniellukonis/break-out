class Paddle{
    constructor(gameBoardObject){
        this.canvas = gameBoardObject.canvas;
        this.context = gameBoardObject.context;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height * 0.90;
        this.xVelocity = this.canvas.width / 50;
        this.width = this.canvas.width / 3;
        this.halfWidth = this.width / 2;
        this.lineWidth = 8;
        
        document.addEventListener("mousemove", e => {
            this.followMouse(e);
        });
    };

    drawPaddle({context} = this){
        context.save();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = "black";
        context.lineCap = "round";
        context.translate(this.x, this.y);
        context.beginPath();

        context.moveTo(-this.halfWidth, 0);
        context.lineTo(this.halfWidth, 0);
        context.stroke();
        context.restore();
    };

    movePaddle(direction){
        //true = right , false = left
        direction ? this.x += this.xVelocity : this.x -= this.xVelocity;
        
    }

    changePaddleWidth(direction){
        //true = right , false = left
        direction ? this.width -= 20 : this.width += 20;
        direction ? this.halfWidth -= 20 : this.halfWidth += 20;
        
    }

    followMouse(event){
        this.x = event.clientX;
    }

    animatePaddle(){
        this.drawPaddle();
        // this.followMouse(null);
    };
};

document.addEventListener("keydown", e => {
    e.keyCode == "37" ? paddle.movePaddle(false) : null;
    e.keyCode == "39" ? paddle.movePaddle(true) : null;
    e.keyCode == "38" ? paddle.changePaddleWidth(false) : null;
    e.keyCode == "40" ? paddle.changePaddleWidth(true) : null;
})


function createPaddle(gameBoardObject){
    return new Paddle(gameBoardObject);
};