var guessText;
var currentWord;
var errorCount = 0;
var gameFinished = false;

const words = [
    "VULCANO",
    "AMICO",
    "ORGANO",
    "RAME",
    "GORILLA",
    "ORZO",
    "NODI",
    "MELANZANA",
    "CRISTALLO",
    "PAVIMENTO",
    "RISOTTO",
    "SEI",
    "STALATTITI",
    "SINISTRA",
    "SILURO"
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("container");
    const buttons = container.getElementsByTagName("button");
    guessText = document.getElementById("guessText");

    genNewWord();

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("id", buttons[i].innerText + "button");
        buttons[i].addEventListener("click", putLetter);
    }
});

function putLetter(evt) {
    const button = document.getElementById(evt.target.id);
    const image = document.getElementById("image");
    const endMessage = document.getElementById("endMessage");
    const rsButton = document.getElementById("restartButton");

    let newGuessText = guessText.innerText.replace(/ /g, '');
    let isWrong = true;

    if (!gameFinished) {
        for (let i = 0; i < currentWord.length; i++) {
            if (button.innerText === currentWord[i]) {
                newGuessText = replaceAt(newGuessText, i, button.innerText);
                isWrong = false;
            }
        }

        guessText.innerHTML = newGuessText.split("").join(" ");

        if (isWrong) {
            errorCount++;

            image.src = "Sprites/Impiccato" + errorCount + ".png";

            if (errorCount === 10) {
                errorCount = 0;
                gameFinished = true;
                endMessage.innerHTML = "Hai perso! La parola era " + currentWord;
                rsButton.style.visibility = "visible";
            }
        } else {
            if (guessText.innerText.replace(/ /g, '') === currentWord) {
                errorCount = 0;
                gameFinished = true;
                endMessage.innerHTML = "Hai vinto!";
                rsButton.style.visibility = "visible";
            }
        }
    }
}

function onRestart() {
    const image = document.getElementById("image");
    const endMessage = document.getElementById("endMessage");
    const rsButton = document.getElementById("restartButton");

    genNewWord();
    image.src = "Sprites/Impiccato0.png";
    gameFinished = false;
    endMessage.innerHTML = "";
    rsButton.style.visibility = "hidden";
}

function genNewWord() {
    let index = getRandomInt(0, words.length);
    currentWord = words[index];
    resetText(words[index]);
}

function resetText(word) {
    let newString = "";

    for (let i = 0; i < word.length; i++) {
        newString += "_ ";
    }

    guessText.innerHTML = newString;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function replaceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}