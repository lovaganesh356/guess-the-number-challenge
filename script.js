
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let score = 100;
let gameOver = false;

const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const history = document.getElementById("history");

function speak(text) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
}

function makeGuess() {
    if (gameOver) return;

    const guess = Number(input.value);

    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "Enter a number between 1 and 100.";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        message.textContent = `Congratulations! You guessed it in ${attempts} attempts!`;
        speak("Congratulations! You won the challenge!");
        gameOver = true;
    } else {
        score = Math.max(0, score - 10);

        const result = guess < secretNumber
            ? "Too low! Try a higher number."
            : "Too high! Try a lower number.";

        message.textContent = result;
        history.textContent += `Guess ${attempts}: ${guess} - ${result}\n`;
        speak(result);
    }

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("score").textContent = score;

    input.value = "";
}

function restartGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    score = 100;
    gameOver = false;

    document.getElementById("attempts").textContent = 0;
    document.getElementById("score").textContent = 100;

    message.textContent = "New game started. Make your guess!";
    history.textContent = "";
    input.value = "";

    window.speechSynthesis?.cancel();
}

document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("restartBtn").addEventListener("click", restartGame);

input.addEventListener("keydown", event => {
    if (event.key === "Enter") makeGuess();
});

document.getElementById("voiceBtn").addEventListener("click", () => {
    speak(message.textContent);
});

document.getElementById("feedbackBtn").addEventListener("click", () => {
    const feedback = document.getElementById("feedback").value.trim();

    if (!feedback) {
        alert("Please enter your feedback.");
        return;
    }

    alert("Thank you for your feedback!");
    document.getElementById("feedback").value = "";
});
