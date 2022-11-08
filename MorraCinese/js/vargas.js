var username;
var score = 0;
var turns;

const moves = [
    "carta",
    "forbice",
    "sasso"
]

document.addEventListener('DOMContentLoaded', () => {
    if(document.cookie) {
        const startDiv = document.getElementById("gameStart");
        const handChoiceDiv = document.getElementById("handChoice");
        
        startDiv.hidden = true
        handChoiceDiv.hidden = false;
    }
});

function startGame() {
    const startDiv = document.getElementById("gameStart");
    const handChoiceDiv = document.getElementById("handChoice");

    var mainImageElem = document.getElementById("mainImage");
    var resultDiv = document.getElementById("result")

    const txtNameElem = document.getElementById("txtName");
    const txtTurnsElem = document.getElementById("txtTurns");

    const userElem = document.getElementById("user");

    const restartElem = document.getElementById("restartBt");

    const turnsElem = document.getElementById("turns")
    console.log(document.cookie);
    const regex1 = new RegExp('^[A-Za-z]{1,10}$');
    const regex2 = new RegExp('[1-9]');
    
    if ((regex1.test(txtNameElem.value) && regex2.test(txtTurnsElem.value))) {

        turns = txtTurnsElem.value;
        turnsElem.innerHTML = "Turno: " + turns;
        
        setCookie("username", txtNameElem.value, 10);

        startDiv.hidden = true;
        handChoiceDiv.hidden = false;
        username = txtNameElem.value;
        userElem.innerHTML = username + " fai la tua scelta!";

        mainImageElem.hidden = false;
        resultDiv.hidden = true;
        restartElem.hidden = true;
        restartElem.hidden = true;
    }
}

function restartGame() {
    const startDiv = document.getElementById("gameStart");
    const handChoiceDiv = document.getElementById("handChoice");

    var mainImageElem = document.getElementById("mainImage");
    var resultDiv = document.getElementById("result")

    const txtNameElem = document.getElementById("txtName");
    const txtTurnsElem = document.getElementById("txtTurns")

    const userElem = document.getElementById("user");

    const restartElem = document.getElementById("restartBt");

    const turnsElem = document.getElementById("turns")

    turns--;
    turnsElem.innerHTML = "Turno: " + turns;

    startDiv.hidden = true;
    handChoiceDiv.hidden = false;
    username = txtNameElem.value;
    userElem.innerHTML = username + " fai la tua scelta!";

    mainImageElem.hidden = false;
    resultDiv.hidden = true;
    restartElem.hidden = true;
    restartElem.hidden = true;
}


function chooseHand() {
    var mainImageElem = document.getElementById("mainImage");

    var resultDiv = document.getElementById("result")
    var userImageElem = document.getElementById("userImage");
    var botImageElem = document.getElementById("botImage");

    var move = event.srcElement.id;
    var botMove = moves[getRandomInt(0, 3)];

    const userElem = document.getElementById("user");
    const restartElem = document.getElementById("restartBt");
    const restartBtElem = document.getElementById("restartBtElem");

    const scoreElem = document.getElementById("score");
    const turnsElem = document.getElementById("turns");

    mainImageElem.hidden = true;
    resultDiv.hidden = false;
    restartElem.hidden = false;

    userImageElem.src = "img/" + move + "_sx" + ".png";
    botImageElem.src = "img/" + botMove + "_dx" + ".png";

    turns--;
    turnsElem.innerHTML = "Turno: " + turns;
    console.log(turns <= 0);
    if (turns <= 0) {
        restartBtElem.innerHTML = "Risultato";
    }

    if (move === botMove) {
        userElem.innerHTML = "Pareggio";
    } else {
        if ((move === "carta" && botMove === "sasso") ||
                (move === "forbice" && botMove === "carta") ||
                (move === "sasso" && botMove === "forbice")) {
            userElem.innerHTML = "Hai vinto!";
            score += 100;
            scoreElem.innerHTML = score + "pt";
        } else {
            userElem.innerHTML = "Hai perso!";
            score -= 100;
            scoreElem.innerHTML = score + "pt";
        }
    }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}