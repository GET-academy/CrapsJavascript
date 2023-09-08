// Model

var dice1 = 0;
var dice2 = 0;
var currentDiceSum = 0;
var previousDiceSum = 0;
var turn = 0;
var points = 0;
var isFirstTurn = true;
var didGameEnd = false;
var maxDice = 2;


// View

function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <button id="rollDiceButton" onclick='gameLoop()'>Roll dice</button>
    <button id="newGameButton" onclick='newGame()'>New game</button>
    <div id="dice1">Dice 1: ${dice1}</div>
    <div id="dice2">Dice 2: ${dice2}</div>
    <div id="sumCurrent">Sum this round: ${currentDiceSum}</div>
    <div id="sumPrevious">Sum previous round: ${previousDiceSum}</div>
    <div id="points">Points: ${points}</div>
    <div id="turns">Current turn: ${turn}</div>
    `;
}


// Controller

function rollDice() {
    // adding one here because 0 does not exist on a dice
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    return dice1 + dice2;
}

function newGame() {
    dice1 = dice2 = 0;
    currentDiceSum = 0;
    previousDiceSum = 0;
    isFirstTurn = true;
    turn = 0;
    points = 0;
    didGameEnd = false;
    updateView();
}

function snakeEyes(inSum) {
    if (inSum == 2) {
        return true;
    }
    return false;
}

function checkPlayerStatusFirstRound() {
    if (currentDiceSum == 7 || currentDiceSum == 11) {
        console.log("You win");
        didGameEnd = true;
    }

    if (currentDiceSum == 2 || currentDiceSum == 3 || currentDiceSum == 12) {
        console.log("You lose");
    
        if (snakeEyes(currentDiceSum)) {
            console.log("Snake eyes!"); // hissss
        }
    
        didGameEnd = true;
    }
}

function checkPlayerStatus() {
    if (previousDiceSum == currentDiceSum) {
        console.log("You win");
        didGameEnd = true;
    }

    if (currentDiceSum == 7) {
        console.log("You lose");
        didGameEnd = true;
    }
}

function gameLoop() {
    turn++;
    currentDiceSum = rollDice();

    if (isFirstTurn) {
        checkPlayerStatusFirstRound();
        isFirstTurn = false;
    }

    else {
        checkPlayerStatus();
    }

    points += currentDiceSum;
    updateView();
    previousDiceSum = currentDiceSum;

    if (didGameEnd) {
        document.getElementById('rollDiceButton').disabled = true;
    }
}
