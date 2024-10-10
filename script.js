

const canvas = document.getElementById("pelikentta");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

let biscuits = [];
let biscuitVelocity = 2;

let carrots = [];
let carrotVelocity = 3;

let olives = [];
let oliveVelocity = 3;

let sausages = [];
let sausageVelocity = 1;


let velocity = 6;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let score = 0;
let lives = 5;
let over = false;
let timer = 0;

// Load images and media
const backgroundImage = new Image();
backgroundImage.src = "images/background2.png";
const biscuitImage = new Image();
biscuitImage.src = "images/biscuit50.png";
const dogImage = new Image();
dogImage.src = "images/bablo_center.png";
const carrotImage = new Image();
carrotImage.src = "images/carrot50.png";
const oliveImage = new Image();
oliveImage.src = "images/olive50.png";
const sausageImage = new Image();
sausageImage.src = "images/sausage50.png";
// const backgroundMusic = new Audio("music/biscuithunt.mp3");
const barkSound = new Audio("sounds/bark.wav");
const wrongSound = new Audio("sounds/wrong.wav");
const lostSound = new Audio("sounds/lost.wav");
const overSound = new Audio("sounds/gameover.wav");

// Character position at start
let dog = {
    x: canvas.width / 2 -25, y: canvas.height -100, width: 50, height: 50
};

window.onload = function() {
    const backgroundMusic = new Audio("music/biscuithunt.mp3");
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;
    gameLoop();
    setInterval(spawnBiscuit, 1000);
    setInterval(spawnCarrot, 3000);
    setInterval(spawnOlive, 4500);
    setInterval(spawnSausage, 5000);
    setInterval(incTimer, 1000);
};

// Draw elements
function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(dogImage, dog.x, dog.y, dog.width, dog.height);
    biscuits.forEach(biscuit => {
        ctx.drawImage(biscuitImage, biscuit.x, biscuit.y, 50,50);
    });
    carrots.forEach(carrot => {
        ctx.drawImage(carrotImage, carrot.x, carrot.y, 50,50);
    });
    olives.forEach(olive => {
        ctx.drawImage(oliveImage, olive.x, olive.y, 50,50);
    });
    sausages.forEach(sausage => {
        ctx.drawImage(sausageImage, sausage.x, sausage.y, 50,50);
    });
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 40);
    ctx.fillText("Lives: " + lives, canvas.width / 2, 40);
    ctx.fillText("Time: " + timer, canvas.width - 115, 40);
}

function spawnBiscuit () {
    biscuits.push({ x: Math.random() * canvas.width - 50, y: 0});
};

function spawnCarrot () {
    carrots.push({ x: Math.random() * canvas.width - 50, y: 0});
};

function spawnOlive () {
    olives.push({ x: Math.random() * canvas.width - 50, y: 0});
};

function spawnSausage () {
    sausages.push({ x: Math.random() * canvas.width - 50, y: 0});
};

function incTimer () {
    timer += 1
};

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + 50 &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + 50 &&
        rect1.height + rect1.y > rect2.y
    );
}

// Check if the button IS pressed
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        moveLeft= true;
    }
    if (event.key === "ArrowRight") {
        moveRight= true;
    }
    if (event.key === "ArrowUp") {
        moveUp= true;
    }
    if (event.key === "ArrowDown") {
        moveDown= true;
    }
})

// Check if the button is RELEASED
document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowLeft") {
        moveLeft= false;
    }
    if (event.key === "ArrowRight") {
        moveRight= false;
    }
    if (event.key === "ArrowUp") {
        moveUp= false;
    }
    if (event.key === "ArrowDown") {
        moveDown= false;
    }
})

function update() {
    if (moveLeft && dog.x > 0) {
        dog.x -= velocity;
    }
    if (moveRight && dog.x < canvas.width - dog.width) {
        dog.x += velocity;
    }
    if (moveUp && dog.y > 0) {
        dog.y -= velocity;
    }
    if (moveDown && dog.y < canvas.height - dog.height) {
        dog.y += velocity;
    }
    biscuits.forEach(biscuit => {
        biscuit.y += biscuitVelocity;
        if (isColliding(dog, biscuit)) {
            biscuits = biscuits.filter(b => b !== biscuit);
            score++;
            barkSound.play();
            };
        if (biscuit.y > canvas.height) {
            biscuits = biscuits.filter(b => b !== biscuit);
            lives--;
            lostSound.play();
        };
    });
    carrots.forEach(carrot => {
        carrot.y+= carrotVelocity;
        if (isColliding(dog, carrot)) {
            carrots = carrots.filter(b => b !== carrot);
            score -= 1;
            wrongSound.play();
            };
        if (carrot.y > canvas.height) {
            carrots = carrots.filter(b => b !== carrot);
        };
    })
    olives.forEach(olive => {
        olive.y+= oliveVelocity;
        if (isColliding(dog, olive)) {
            olives = olives.filter(b => b !== olive);
            score -= 2;
            wrongSound.play();
            };
        if (olive.y > canvas.height) {
            olives = olives.filter(b => b !== olive);
        };
    })
    sausages.forEach(sausage => {
        sausage.y+= sausageVelocity;
        if (sausage.y > canvas.height) {
            sausages = sausages.filter(b => b !== sausage);
        };
        if (isColliding(dog, sausage)) {
            sausages = sausages.filter(b => b !== sausage);
            over= true;
            backgroundMusic.autoplay = false;
            overSound.play();
            };
    })

    if (lives < 1){
        over= true;
        backgroundMusic.autoplay = false;
        overSound.play();
        
    }
};

function gameLoop() {
     if (!over) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
};


