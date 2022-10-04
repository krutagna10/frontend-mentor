'use strict';

const body = document.querySelector('body');
const rulesButton = document.querySelector('.rules-button');
const rulesElement = document.querySelector('.rules');
const closeIcon = document.querySelector('.close-icon');
const overlay = document.querySelector('.overlay');
const paper = document.querySelector('.paper-container');
const scissors = document.querySelector('.scissors-container');
const rock = document.querySelector('.rock-container');
const scoreElement = document.querySelector('.score');
const userPickContainer = document.querySelector('.user-pick-container');
const computerPickContainer = document.querySelector('.computer-pick-container');
const userPickImage = document.querySelector('.user-pick-image');
const computerPickImage = document.querySelector('.computer-pick-image');
const playAgainButton = document.querySelector('.play-again-btn');
const result = document.querySelector('.result');

//Initializing variables
let userChoice;
let computerChoiceValue;
let score = 0;

// Computer Choice
let computerChoice = () => {
    let random = 1 + parseInt(Math.random() * 3);
    if (random === 1) {
        return 'rock';
    } else if (random === 2) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Displaying scores and incrementing or decrementing them
const incrementScore = () => {
    score = score + 1;
    scoreElement.textContent = score;
}
const decrementScore = () => {
    score = score - 1;
    if (score < 0) {
        score = 0;
    }
    scoreElement.textContent = score;
}

// Display images on result tab
function displayChoiceImage() {
    userPickContainer.classList.add(`${userChoice}-container`);
    console.log(userPickContainer.classList);
    userPickImage.src = `Images/icon-${userChoice}.svg`;
    computerPickContainer.classList.add(`${computerChoiceValue}-container`);
    console.log(computerPickContainer.classList);
    computerPickImage.src = `Images/icon-${computerChoiceValue}.svg`;
}

// Results that can occur during the game
function userWin() {
    result.textContent = 'You Win';
    displayChoiceImage();
}

function userLose() {
    result.textContent = 'You Lose';
    displayChoiceImage();
}

function draw() {
    result.textContent = 'Draw';
    displayChoiceImage();
}

// Game logic
function game() {
    computerChoiceValue = computerChoice();
    if (userChoice === computerChoiceValue) {
        draw();
    } else if (userChoice === 'rock') {
        if (computerChoiceValue === 'paper') {
            decrementScore();
            userLose();
        } else {
            incrementScore()
            userWin();
        }
    } else if (userChoice === 'paper') {
        if (computerChoiceValue === 'rock') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
    } else {
        if (computerChoiceValue === 'rock') {
            decrementScore();
            userLose();
        } else {
            incrementScore();
            userWin();
        }
    }
}

paper.addEventListener('click', () => {
    userChoice = 'paper';
    game();
    body.classList.add('game-finished');
})
scissors.addEventListener('click', () => {
    userChoice = 'scissors';
    game();
    body.classList.add('game-finished');
})
rock.addEventListener('click', () => {
    userChoice = 'rock';
    game();
    body.classList.add('game-finished');
})

//Play again Button
playAgainButton.addEventListener('click', () => {
    body.classList.remove('game-finished');
    userPickContainer.classList.remove(`${userChoice}-container`);
    computerPickContainer.classList.remove(`${computerChoiceValue}-container`);
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
    if(rulesElement.classList.contains('show')) {
        if (event.key === 'Escape') {
            closeRules();
        }
    }
})


