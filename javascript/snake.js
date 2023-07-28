let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("food sound.wav");
const movesound = new Audio("button-click.mp3");
const gameOver = new Audio("gameover.wav");
let speed = 5;
var score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 10, y: 10 };

//const gameboard = document.querySelector(".board");
const scoreBox = document.getElementById("score");

//game functions
function main(ctime) {
    requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gamePlaying();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }  

}


function gamePlaying() {

    if (isCollide(snakeArr)) {
        gameOver.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to restart");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //when food eaten
    if (snakeArr[0].x === food.x, snakeArr[0].y === food.y) {
        foodsound.play();
        score +=1;
        scoreBox.innerHTML= " Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part2: 
    //display the snake
    board.innerHTML = " ";
    snakeArr.forEach((s, index) => {
        var snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = s.x;
        snakeElement.style.gridRowStart = s.y;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display the food

    var foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', s => {
    inputDir = { x: 0, y: 1 };
    movesound.play();
    switch (s.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});