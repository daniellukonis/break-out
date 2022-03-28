function resizeCanvasFull(marginPercentage = 1){
    const canvas = document.querySelector("canvas");
    canvas.width = Math.floor(window.innerWidth * marginPercentage);
    canvas.height= Math.floor(window.innerHeight * marginPercentage);
};

function resizeCanvasSquare(){
    const canvas = document.querySelector("canvas");
    const max = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    canvas.width = max;
    canvas.height = max;
};

function clearCanvas(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
};

function fillCanvas(color = "red"){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    context.save()
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
};

function strokeCanvas(color = "black"){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    context.save()
    context.fillStyle = color;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.restore();
};