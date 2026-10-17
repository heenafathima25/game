
const emojis = [
    "🍎", "🍌", "🍇", "🍓",
    "🍕", "🍔", "🍩", "🍦"
];

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
let locked = false;

function startGame() {
    board.innerHTML = "";
    firstCard = null;
    secondCard = null;
    moves = 0;
    matches = 0;
    locked = false;

    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches;
    message.textContent = "";

    const cards = [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5);

    cards.forEach((emoji) => {
        const card = document.createElement("button");

        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.setAttribute("aria-label", "Hidden card");

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });
}

function flipCard(card) {
    if (
        locked ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
    card.setAttribute("aria-label", card.dataset.emoji);

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesDisplay.textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;
        matchesDisplay.textContent = matches;

        firstCard = null;
        secondCard = null;

        if (matches === emojis.length) {
            message.textContent =
                `🎉 You won in ${moves} moves!`;
        }
    } else {
        locked = true;

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.setAttribute("aria-label", "Hidden card");
            secondCard.setAttribute("aria-label", "Hidden card");

            firstCard = null;
            secondCard = null;
            locked = false;
        }, 800);
    }
}

restartButton.addEventListener("click", startGame);

startGame();
