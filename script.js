// Model

var dice = [0, 0];
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
    <div id="dice1"></div>
    <div id="dice2"></div>
    <div id="sumCurrent"></div>
    <div id="sumPrevious"></div>
    <div id="points"></div>
    <div id="turns"></div>
    `;

    document.getElementById('dice1').innerHTML = `Dice 1: ${dice[0]}`;
    document.getElementById('dice2').innerHTML = `Dice 2: ${dice[1]}`;
    document.getElementById('sumCurrent').innerHTML = `Sum this round: ${currentDiceSum}`;
    document.getElementById('sumPrevious').innerHTML = `Sum previous round: ${previousDiceSum}`;
    document.getElementById('points').innerHTML = `Points: ${points}`;
    document.getElementById('turns').innerHTML = `Current turn: ${turn}`;
}


// Controller

function rollDice() {
    // adding one here because 0 does not exist on a dice
    for (let i = 0; i < maxDice; i++) {
        dice[i] = Math.floor(Math.random() * 6) + 1;
    }

    return dice[0] + dice[1];
}

function newGame() {
    dice[0] = dice[1] = 0;
    currentDiceSum = 0;
    previousDiceSum = 0;
    isFirstTurn = true;
    turn = 0;
    points = 0;
    didGameEnd = false;
    updateView();
}

function checkSnakeEyes(inSum) {
    if (inSum == 2) {
        return true;
    }
    return false;
}

function gameLoop() {
    turn++;
    currentDiceSum = rollDice();

    if (isFirstTurn) {
        if (currentDiceSum == 7 || currentDiceSum == 11) {
            console.log("You win");
            didGameEnd = true;
        }
        
        if (currentDiceSum == 2 || currentDiceSum == 3 || currentDiceSum == 12) {
            console.log("You lose");

            if (checkSnakeEyes(currentDiceSum)) {
                // hissss
            }

            didGameEnd = true;
        }
        isFirstTurn = false;
    }

    else {

        if (previousDiceSum == currentDiceSum) {
            console.log("You win");
            didGameEnd = true;
        }
        
        if (currentDiceSum == 7) {
            console.log("You lose");
            didGameEnd = true;
        }
    }

    points += currentDiceSum;
    updateView();
    previousDiceSum = currentDiceSum;

    if (didGameEnd) {
        document.getElementById('rollDiceButton').disabled = true;
    }
}
