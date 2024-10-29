
// Bablos Biscuit Hunt - Small practice with Java Script
// By Niko Nmaki 2024

// https://github.com/NNmaki/Bablos_Biscuit_Hunt_js

// Inspired By @bablo_thedog - https://www.instagram.com/bablo_thedog/


const canvas = document.getElementById("pelikentta");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 700;

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
let timer = 0;
let gameRunning = false;
let gameOver = false;
let gameStart = true; 
let gameInst = false;
let animationFrameId;

// Load images and media
const backgroundImage = new Image();
backgroundImage.src = "images/background2.png";
const menubackgroundImage = new Image();
menubackgroundImage.src = "images/menu_background.png";
const instImage = new Image();
instImage.src = "images/instructions.png";
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
const buttonplayImage = new Image();
buttonplayImage.src = "images/button_play.png";
const buttoninstImage = new Image();
buttoninstImage.src = "images/button_instructions.png";
const buttonquitImage = new Image();
buttonquitImage.src = "images/button_quit.png";

const backgroundMusic = new Audio("music/biscuithunt.mp3");
const menuMusic = new Audio("music/menumusic.mp3");
const barkSound = new Audio("sounds/bark.wav");
const wrongSound = new Audio("sounds/wrong.wav");
const lostSound = new Audio("sounds/lost.wav");
const overSound = new Audio("sounds/gameover.wav");

let dog = {
    x: canvas.width / 2 -25, y: canvas.height -100, width: 100, height: 100
};

window.onload = function() {
    gameLoop();
    setInterval(spawnBiscuit, 1000);
    setInterval(spawnCarrot, 3000);
    setInterval(spawnOlive, 4500);
    setInterval(spawnSausage, 5000);
    setInterval(incTimer, 1000);
};

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
    ctx.font = "bold 22px Arial";
    ctx.fillText("Score: " + score, 50, 40);
    ctx.fillText("Lives: " + lives, canvas.width / 2, 40);
    ctx.fillText("Time: " + timer, canvas.width - 70, 40);
}

function spawnBiscuit () {
    const biscuitWidth = 50;
    const xPosition = Math.random() * (canvas.width - biscuitWidth);
    biscuits.push({ x: xPosition, y: 0 });
};

function spawnCarrot () {
    const carrotWidth = 50;
    const xPosition = Math.random() * (canvas.width - carrotWidth);
    carrots.push({ x: xPosition, y: 0 });
};

function spawnOlive () {
    const oliveWidth = 50;
    const xPosition = Math.random() * (canvas.width - oliveWidth);
    olives.push({ x: xPosition, y: 0 });
};

function spawnSausage () {
    const sausageWidth = 50;
    const xPosition = Math.random() * (canvas.width - sausageWidth);
    sausages.push({ x: xPosition, y: 0 });
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
        dogImage.src = "images/bablo_left.png"; 
    }
    if (event.key === "ArrowRight") {
        moveRight= true;
        dogImage.src = "images/bablo_right.png"; 
    }
    if (event.key === "ArrowUp") {
        moveUp= true;
    }
    if (event.key === "ArrowDown") {
        moveDown= true;
    }
    if (event.key === " " && gameStart) {
        restartGame();
        gameRunning= true;
        gameStart= false;
        gameOver= false;
    }
    if (event.key === " " && !gameStart) {
        restartGame();
        gameRunning= true;
        gameStart= false;
        gameOver= false;
    }
    if (event.key === "Escape" && gameOver || gameInst) {
        startScreen();
        gameRunning= false;
        gameStart= true;
        gameOver= false;
        gameInst = false;
    }
    if (event.key === "i" && gameStart) {
        instructions();
        gameRunning= false;
        gameStart= false;
        gameOver= false;
        gameInst= true;
    }

    if (event.key === "q" && gameStart) {
        alert("You can now safely close your browser or tab by clicking X symbol")
        // closeWindow();
        menuMusic.pause();
        gameRunning= false;
        gameStart= false;
        gameOver= false;
        gameInst= false;
    }



});

// Check if the button is RELEASED
document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowLeft") {
        moveLeft= false;
        dogImage.src = "images/bablo_center.png";
    }
    if (event.key === "ArrowRight") {
        moveRight= false;
        dogImage.src = "images/bablo_center.png";
    }
    if (event.key === "ArrowUp") {
        moveUp= false;
    }
    if (event.key === "ArrowDown") {
        moveDown= false;
    }
});

function closeWindow() {
    window.open('','_parent','');
    window.close();
}

function drawGameOver() {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "bold 30px arial";
    ctx.fillText("Press SPACE to restart", canvas.width / 2, canvas.height / 2 + 50)
    ctx.fillText("Or press ESCAPE to menu", canvas.width / 2, canvas.height / 2 + 100)
};

function startScreen() {
    ctx.fillStyle = "white";
    ctx.drawImage(menubackgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(buttonplayImage, (canvas.width / 2) - (buttonplayImage.width / 2), canvas.height / 2  - 120);
    ctx.drawImage(buttoninstImage, 20, canvas.height / 2 + 30);
    ctx.drawImage(buttonquitImage, (canvas.width) - (buttonquitImage.width) - 20, canvas.height / 2 + 30);
    ctx.font = "bold 60px arial";
    ctx.textAlign = "center";
    menuMusic.play();

};

function instructions() {
    ctx.fillStyle = "white";
    ctx.drawImage(menubackgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(instImage, (canvas.width / 2) - (instImage.width / 2), (canvas.height / 2) - (instImage.height / 2));
    ctx.font = "bold 60px arial";
    ctx.textAlign = "center";
};

function restartGame() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    biscuits = [];
    carrots = [];
    olives = [];
    sausages = [];
    score = 0;
    lives = 5;
    timer = 0;
    dog = { x: canvas.width / 2 -25, y: canvas.height -100, width: 100, height: 100};
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    gameLoop();
};

function update() {
    menuMusic.pause();
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
            gameOver= true;
            gameRunning= false;
            backgroundMusic.pause();
            overSound.play();
            };
    })
    if (lives < 1){
        gameOver= true;
        gameRunning= false;
        backgroundMusic.pause();
        overSound.play();
        
    }
};

function gameLoop() {
    if (gameStart) {
        startScreen();
        menuMusic.autoplay = true;
    } else if (gameRunning) {
        draw();
        backgroundMusic.autoplay = true;
        update();
    } else if (gameOver) {
        drawGameOver();
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}

