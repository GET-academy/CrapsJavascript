// Model

let dice1 = 0;
let dice2 = 0;
let currentDiceSum = 0;
let previousDiceSum = 0;
let turn = 0;
let points = 0;
let isFirstTurn = true;
let didGameEnd = false;

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

newGame();

function getRandomDiceNumber() {
    // adding one here because 0 does not exist on a dice
    return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
    dice1 = getRandomDiceNumber();
    dice2 = getRandomDiceNumber();

    return dice1 + dice2;
}

function newGame() {
    dice1 = 0;
    dice2 = 0;
    currentDiceSum = 0;
    previousDiceSum = 0;
    isFirstTurn = true;
    turn = 0;
    points = 0;
    didGameEnd = false;
    updateView();
}

function checkPlayerStatusFirstRound() {
    if (currentDiceSum == 7 || currentDiceSum == 11) {
        console.log("You win");
        didGameEnd = true;
    }

    if (currentDiceSum == 3 || currentDiceSum == 12) {
        console.log("You lose");
        didGameEnd = true;
    }
    
    if (currentDiceSum == 2) {
        console.log("You lose with Snake eyes!"); // hissss
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

function checkIsFirstTurn() {
    if (!isFirstTurn) {
        checkPlayerStatus();
        return;
    }

    if (isFirstTurn) {
        checkPlayerStatusFirstRound();
        isFirstTurn = false;
    }
}

function gameLoop() {
    turn++;
    currentDiceSum = rollDice();

    checkIsFirstTurn();

    points += currentDiceSum;
    updateView();
    previousDiceSum = currentDiceSum;

    if (didGameEnd) {
        document.querySelector("#rollDiceButton").disabled = true;
    }
}
