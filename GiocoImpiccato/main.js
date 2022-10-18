const {readFileSync, promises: fsPromises} = require('fs');

var guessText;
var buttons;
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
    "SILURO",
    "SCI",
    "AMICHEVOLE",
    "TORRE",
    "ARTIGLIO",
    "INSULTO",
    "GRAVIDANZA",
    "GIOCOLIERE",
    "CHIODO",
    "MARCIAPIEDE",
    "DORMIRE",
    "DIBATTITO",
    "SPIRITO"
];

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("container");
    buttons = container.getElementsByTagName("button");
    guessText = document.getElementById("guessText");

    genNewWord();

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", putLetter);
    }
});

function putLetter() {
    const contents = readFileSync("./dictionary.txt", 'utf-8');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
    const button = event.srcElement;
    const image = document.getElementById("image");
    const endMessage = document.getElementById("endMessage");
    const rsButton = document.getElementById("restartButton");

    let temp = guessText.innerText.replace(/ /g, '');
    let isWrong = true;

    if (!gameFinished) {
        for (let i = 0; i < currentWord.length; i++) {
            if (button.innerText === currentWord[i]) {
                temp = temp.replaceAt(i, button.innerText);
                isWrong = false;
            }
        }

        guessText.innerHTML = temp.split("").join(" ");
        button.disabled = true;

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
    
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

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



