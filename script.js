
const canvas = document.getElementById("pelikentta");
// const context = canvas.getContext("2d"); //pallopeliin liittyvä
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

let biscuits = [];
let biscuitVelocity = 3;



// Load images
const backgroundImage = new Image();
backgroundImage.src = "images/background2.png";
const biscuitImage = new Image();
biscuitImage.src = "images/biscuit50.png";
const dogImage = new Image();
dogImage.src = "images/bablo_center.png";

let dog = {
    x: canvas.width / 2 -25, y: canvas.height -100, width: 50, height: 50
};

// let ball = {
//     x: canvas.width / 2,
//     y: canvas.height / 2, 
//     radius: 15,
//     color: 'red',
//     dx: 2,
//     dy: 2
// };

// Piirretään elementit
function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(dogImage, dog.x, dog.y, dog.width, dog.height);
    biscuits.forEach(biscuit => {
        ctx.drawImage(biscuitImage, biscuit.x, biscuit.y, 50,50);
    });
}


function update() {
    biscuits.forEach(biscuit => {
        biscuit.y += biscuitVelocity;
    })
}


function spawnBiscuit () {
    biscuits.push({ x: Math.random() * canvas.width, y: 0});
}

// function drawBackground() {
//     ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
// }

// function drawBall() {
//     // context.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI *2);
//     ctx.fillStyle = ball.color;
//     ctx.fill();
//     ctx.closePath();
// }

// function updateBall() {
//     ball.x += ball.dx;
//     ball.y += ball.dy;

//     if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
//         ball.dx *= -1;
//     }
//     if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
//         ball.dy *= -1;
//     }
// }

function gameLoop() {
    // drawBackground();
    // drawBall();
    // updateBall();
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// backgroundImage.onload = function() 
gameLoop();
setInterval(spawnBiscuit, 1000);

