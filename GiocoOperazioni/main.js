const Operations = {
    Add: "+",
    Sub: "-",
    Multi: "x",
    Div: "/"
};

var operationElem;
var pointsElem;
var timerElem;

var endGameElem;
var scoreElem;

var result = null;
var points = 0;

const maxTime = 10;
var timer = maxTime;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded', () => {
    operationElem = document.getElementById("fullOperation");
    pointsElem = document.getElementById("points");
    timerElem = document.getElementById("timer");

    endGameElem = document.getElementById("endGame");
    scoreElem = document.getElementById("score");

    genOperation();

    setInterval(function () {
        timer--;

        if (timer >= 0) {
            if(timer <= 5) {
                timerElem.style.color = "red";
            } else {
                timerElem.style.color = "black";
            }
            
            timerElem.innerHTML = timer + "s";
        } else {
            endGameElem.hidden = false;
            scoreElem.innerHTML = points;
        }
    }, 1000);
});

function genOperation() {
    var number1;
    var number2;

    var operation = getRandomInt(0, 4);
    var operationStr;

    result = null;
    timer = maxTime;
    timerElem.innerHTML = maxTime;
    endGameElem.hidden = true;

    while (!Number.isInteger(result)) {
        number1 = getRandomInt(0, 100);
        number2 = getRandomInt(0, 100);

        switch (operation) {
            case 0:
                result = number1 + number2;
                operationStr = Operations.Add;
                break;
            case 1:
                result = number1 - number2;
                operationStr = Operations.Sub;
                break;
            case 2:
                result = number1 * number2;
                operationStr = Operations.Multi;
                break;
            case 3:
                result = number1 / number2;
                operationStr = Operations.Div;
                break;
        }
    }

    operationElem.innerHTML = number1 + " " + operationStr + " " + number2 + " = __";
}

function onGuessing() {
    const input = event.srcElement;

    if (input.value == result) {
        input.value = "";
        points += 100;
        pointsElem.innerHTML = points + "pt";
        genOperation();
    }
}

function restart() {
    points = 0;
    pointsElem.innerHTML = 0 + "pt";
    timerElem.style.color = "black";
    genOperation();
}