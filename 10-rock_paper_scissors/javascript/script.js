'use strict';

// Data
const winConditionsOriginal = [
    ['rock', 'scissors'],
    ['scissors', 'paper'],
    ['paper', 'rock'],
]

const winConditionsBonus = [
    ['scissors', 'paper', 'lizard'],
    ['paper', 'rock', 'spock'],
    ['rock', 'lizard', 'scissors'],
    ['lizard', 'spock', 'paper'],
    ['spock', 'scissors', 'rock']
]

let userChoice;
let computerChoice;
let choices = [];
let score = 0;

// Elements
const body = document.querySelector('body');
const rulesButton = document.querySelector('.rules-button');
const rulesElement = document.querySelector('.rules');
const closeIcon = document.querySelector('.close-icon');
const overlay = document.querySelector('.overlay');
const paperElement = document.querySelectorAll('.paper-container');
const scissorsElement = document.querySelectorAll('.scissors-container');
const rockElement = document.querySelectorAll('.rock-container');
const spockElement = document.querySelector('.spock-container');
const lizardElement = document.querySelector('.lizard-container');
const scoreElement = document.querySelector('.score');
const userPickContainer = document.querySelector('.user-pick-container');
const computerPickContainer = document.querySelector('.computer-pick-container');
const userPickImage = document.querySelector('.user-pick-image');
const computerPickImage = document.querySelector('.computer-pick-image');
const playAgainButton = document.querySelector('.play-again-btn');
const result = document.querySelector('.result');
const easyDifficulty = document.querySelector('.difficulty-buttons .one');
const hardDifficulty = document.querySelector('.difficulty-buttons .two');
const rulesImageElement = document.querySelector('.rules-image');
const headingLogo = document.querySelector('.heading-logo');
const userWinBackground = document.querySelector('.user-pick-container .win-background');
const computerWinBackground = document.querySelector('.computer-pick-container .win-background');
const computerPickBox = document.querySelector('.computer-pick-box');
const resultBox = document.querySelector('.result-box');

//Initializing variables


// Computer Choice
let computerChoiceGenerator = (game) => {
    if (game === 'original') {
        let choiceOptions = ['rock', 'paper', 'scissors'];
        let random = Math.floor(Math.random() * 3);
        return choiceOptions[random];
    } else {
        let random = Math.floor(Math.random() * 5);
        let choiceOptions = ['scissors', 'spock', 'paper', 'lizard', 'rock'];
        return choiceOptions[random];
    }
}

// Displaying scores and incrementing or decrementing them
const incrementScore = () => {
    score = score + 1;
    setTimeout(() => scoreElement.textContent = score, 1300);
}
const decrementScore = () => {
    score = score - 1;
    if (score < 0) {
        score = 0;
    }
    setTimeout(() => scoreElement.textContent = score, 1300);
}

// Display images on result tab
function displayUserImage() {
    userPickContainer.classList.add(`${userChoice}-container`);
    userPickImage.src = `images/icon-${userChoice}.svg`;
}

function displayComputerImage() {
    computerPickBox.style.display = 'flex';
    computerPickContainer.classList.add(`${computerChoice}-container`);
    computerPickImage.src = `images/icon-${computerChoice}.svg`;
}

function removeResultImage() {
    userPickContainer.classList.remove(`${userChoice}-container`);
    computerPickContainer.classList.remove(`${computerChoice}-container`);
}

function showWinBackground(winner) {
    if (winner === 'user') {
        userWinBackground.style.display = 'block';
        computerWinBackground.style.display = 'none';
    } else if (winner === 'computer') {
        computerWinBackground.style.display = 'block';
        userWinBackground.style.display = 'none';
    } else {
        computerWinBackground.style.display = 'none';
        userWinBackground.style.display = 'none';
    }
}

function removeWinBackground() {
    computerWinBackground.style.display = 'none';
    userWinBackground.style.display = 'none';
}

function showResult(winner) {
    resultBox.style.display = 'flex';
    if (winner === 'user') {
        result.textContent = 'You Win';
    } else if (winner === 'computer') {
        result.textContent = 'You Lose';
    } else {
        result.textContent = 'Draw';
    }
}

// Results that can occur during the game
function userWin() {
    computerPickBox.style.display = 'none';
    resultBox.style.display = 'none';
    displayUserImage();
    setTimeout(displayComputerImage, 1300);
    setTimeout(showResult, 1300, 'user');
    setTimeout(showWinBackground, 1300, 'user');
}

function userLose() {
    computerPickBox.style.display = 'none';
    resultBox.style.display = 'none';
    displayUserImage();
    setTimeout(displayComputerImage, 1300);
    setTimeout(showResult, 1300, 'computer');
    setTimeout(showWinBackground, 1300, 'computer');
}

function draw() {
    computerPickBox.style.display = 'none';
    resultBox.style.display = 'none';
    displayUserImage();
    setTimeout(displayComputerImage, 1300);
    setTimeout(showResult, 1300, 'draw');
    showWinBackground('draw');
}

const checkWinOriginal = (choices) => {
    return winConditionsOriginal.findIndex(element => element.join() === choices.join()) !== -1
}

const checkWinBonus = (choices) => {
    const winConditionArray = winConditionsBonus.find(element => element[0] === choices[0]);
    return choices.every(element => winConditionArray.includes(element));
}

// Original Game logic
function originalGame() {
    computerChoice = computerChoiceGenerator('original');
    choices = [userChoice, computerChoice];

    if (userChoice === computerChoice) {
        draw();
    } else if (checkWinOriginal(choices)) {
        incrementScore()
        userWin();
    } else {
        decrementScore();
        userLose();
    }
}

// Bonus Game Logic
function bonusGame() {
    computerChoice = computerChoiceGenerator('bonus-game');
    choices = [userChoice, computerChoice];

    if (userChoice === computerChoice) {
        draw();
    } else if (checkWinBonus(choices)) {
        incrementScore();
        userWin();
    } else {
        decrementScore();
        userLose();
    }

}

for (let paper of paperElement) {
    paper.addEventListener('click', () => {
        if (body.classList.contains('difficulty-hard')) {
            userChoice = 'paper';
            bonusGame();
            body.classList.add('game-finished');
        } else {
            userChoice = 'paper';
            originalGame();
            body.classList.add('game-finished');
        }
    })
}

for (let scissors of scissorsElement) {
    scissors.addEventListener('click', () => {
        if (body.classList.contains('difficulty-hard')) {
            userChoice = 'scissors';
            bonusGame();
            body.classList.add('game-finished');
        } else {
            userChoice = 'scissors';
            originalGame();
            body.classList.add('game-finished');
        }
    })
}

for (let rock of rockElement) {
    rock.addEventListener('click', () => {
        if (body.classList.contains('difficulty-hard')) {
            userChoice = 'rock';
            bonusGame();
            body.classList.add('game-finished');
        } else {
            userChoice = 'rock';
            originalGame();
            body.classList.add('game-finished');

        }
    })
}

spockElement.addEventListener('click', () => {
    userChoice = 'spock';
    bonusGame();
    body.classList.add('game-finished');
})

lizardElement.addEventListener('click', () => {
    userChoice = 'lizard';
    bonusGame();
    body.classList.add('game-finished');
})


//Play again Button
playAgainButton.addEventListener('click', () => {
    body.classList.remove('game-finished');
    removeResultImage();
    removeWinBackground();
})

// Difficulty
easyDifficulty.addEventListener('click', () => {
    body.classList.remove('difficulty-hard');
    body.classList.remove('game-finished');
    easyDifficulty.classList.add('current-active');
    hardDifficulty.classList.remove('current-active');
    removeResultImage()

    // Making the score 0
    score = 0;
    scoreElement.textContent = 0;

    // Changing images according to difficulty level
    headingLogo.src = 'images/logo.svg';
    rulesImageElement.src = 'images/image-rules.svg';
})

hardDifficulty.addEventListener('click', () => {
    body.classList.add('difficulty-hard');
    body.classList.remove('game-finished');
    hardDifficulty.classList.add('current-active');
    easyDifficulty.classList.remove('current-active');
    removeResultImage();

    // Making the score 0
    score = 0;
    scoreElement.textContent = 0;

    // Changing images according to difficulty level
    headingLogo.src = 'images/logo-bonus.svg';
    rulesImageElement.src = 'images/image-rules-bonus.svg';
})

// Rules
const closeRules = () => {
    rulesElement.classList.remove('show');
    overlay.classList.add('overlay-hidden');
}

rulesButton.addEventListener('click', () => {
    rulesElement.classList.add('show');
    overlay.classList.remove('overlay-hidden');
})

closeIcon.addEventListener('click', closeRules)

// When the user clicks Escape key
document.addEventListener('keydown', (event) => {
    if (rulesElement.classList.contains('show')) {
        if (event.key === 'Escape') {
            closeRules();
        }
    }
})




