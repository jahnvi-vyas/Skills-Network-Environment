const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startbtn");

const colors = [
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
    "#FF9671",
    "#00C9A7",
    "#F9A826"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timeLeft = 30;
let timer;

function startGame() {
    clearInterval(timer);

    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    gameContainer.innerHTML = "";

    cards = [...colors, ...colors];

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((color) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.color = color;

        card.style.backgroundColor = "lightblue";
        card.style.color = "white";
        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.fontWeight = "bold";
        card.style.fontSize = "20px";
        card.style.cursor = "pointer";
        card.style.borderRadius = "8px";

        card.addEventListener("click", flipCard);

        gameContainer.appendChild(card);
    });

    timer = setInterval(updateTimer, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    this.style.backgroundColor = this.dataset.color;
    this.textContent = "✓";

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        resetSelection();

        if (score === colors.length) {
            clearInterval(timer);
            setTimeout(() => {
                alert("🎉 Congratulations! You matched all cards!");
            }, 300);
        }
    } else {
        setTimeout(() => {
            firstCard.style.backgroundColor = "lightblue";
            secondCard.style.backgroundColor = "lightblue";

            firstCard.textContent = "";
            secondCard.textContent = "";

            resetSelection();
        }, 800);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function updateTimer() {
    timeLeft--;

    timerDisplay.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(timer);

        alert("⏰ Time's Up!");

        document.querySelectorAll(".card").forEach(card => {
            card.style.pointerEvents = "none";
        });
    }
}

startBtn.addEventListener("click", startGame);

// Start automatically when page loads
startGame();
