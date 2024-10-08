
const canvas = document.getElementById("pelikentta");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const backgroundImage = new Image();
backgroundImage.src = "background2.png";


let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2, 
    radius: 15,
    color: 'red',
    dx: 2,
    dy: 2
};

function drawBackground() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawBall() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI *2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
}

function gameLoop() {
    drawBackground();
    drawBall();
    updateBall();
    requestAnimationFrame(gameLoop);
}

backgroundImage.onload = function() {
    gameLoop();
};

