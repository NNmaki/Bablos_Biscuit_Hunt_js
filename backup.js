
// Varmuuskopio toimivasta klo 10.29

const canvas = document.getElementById("pelikentta");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

let biscuits = [];
let biscuitVelocity = 3;
let velocity = 6;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

// Load images
const backgroundImage = new Image();
backgroundImage.src = "images/background2.png";
const biscuitImage = new Image();
biscuitImage.src = "images/biscuit50.png";
const dogImage = new Image();
dogImage.src = "images/bablo_center.png";


// Character position
let dog = {
    x: canvas.width / 2 -25, y: canvas.height -100, width: 50, height: 50
};

// Draw elements
function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(dogImage, dog.x, dog.y, dog.width, dog.height);
    biscuits.forEach(biscuit => {
        ctx.drawImage(biscuitImage, biscuit.x, biscuit.y, 50,50);
    });
}

// Check if the button IS pressed
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && dog.x > 0) {
        dog.x -= velocity;
    }
    if (event.key === "ArrowRight" && dog.x < canvas.width - dog.width) {
        dog.x += velocity;
    }

})

function update() {
    biscuits.forEach(biscuit => {
        biscuit.y += biscuitVelocity;
    })
};

function spawnBiscuit () {
    biscuits.push({ x: Math.random() * canvas.width, y: 0});
};

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
};

// backgroundImage.onload = function() 
gameLoop();
setInterval(spawnBiscuit, 1000);

