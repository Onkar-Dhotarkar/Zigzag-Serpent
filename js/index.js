let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let highScore = 0;
let lastPaintime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

const scoreBox = document.getElementById('scoreBox');
const hiScoreBox = document.getElementById('hiscoreBox');

const increaseSpeedBtn = document.getElementById('increaseSpeedBtn');
increaseSpeedBtn.addEventListener('click', () => {
    speed += 1; // Increase the speed by 1 (you can modify this value as needed)
});

const decreaseSpeedBtn = document.getElementById('decreaseSpeedBtn');
decreaseSpeedBtn.addEventListener('click', () => {
    speed -= 1; // Increase the speed by 1 (you can modify this value as needed)
});

function updateScore(score) {
    scoreBox.innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        hiScoreBox.innerText = `HiScore: ${highScore}`;
    }
}
function setMusicVolume(volume) {
    musicSound.volume = volume / 100; // Adjust volume between 0 and 1
}
const levelBar = document.getElementById('levelBar'); // Assuming 'levelBar' is the ID of your level bar/slider element

levelBar.addEventListener('input', () => {
    const volumeLevel = levelBar.value; // Get the current value of the level bar
    setMusicVolume(volumeLevel); // Set music volume based on the level bar value
});

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintime = ctime;
    gameEngine();
}

function iscollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    if (iscollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Any key Play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        if (score > highScore) {
            highScore = score;
            hiScoreBox.innerText = `HiScore: ${highScore}`;
        }
        score = 0;
        updateScore(score);
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        updateScore(score);
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
