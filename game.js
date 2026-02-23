const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let gameActive = true;

let circle = { x: 200, y: 200, radius: 30 };

// Generate a random soft color
function randomColor() {
    const colors = ["#f28f8f", "#f2d388", "#c2f0f9", "#a6f2c0", "#f2a6e4"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw the circle
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Move the circle to a random position
function moveCircle() {
    circle.x = Math.random() * (canvas.width - circle.radius * 2) + circle.radius;
    circle.y = Math.random() * (canvas.height - circle.radius * 2) + circle.radius;
    drawCircle();
}

// Game loop (optional if you want animations)
function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    moveCircle();

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#b08968";
    ctx.font = "24px Quicksand";
    ctx.fillText(`Game Over! Score: ${score}`, 50, canvas.height / 2);
}

// Check clicks
canvas.addEventListener("click", function(event) {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const distance = Math.sqrt((clickX - circle.x)**2 + (clickY - circle.y)**2);
    if (distance < circle.radius) {
        score++;
        scoreEl.textContent = score;
        moveCircle();
    }
});

// Restart button
restartBtn.addEventListener("click", () => {
    startGame();
});

// Start immediately
startGame();
