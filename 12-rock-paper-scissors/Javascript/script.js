'use strict';

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

//Initializing variables
let userChoice;
let computerChoiceValue;
let score = 0;

// Computer Choice
let computerChoice = (game) => {
    if (game === 'original') {
        let random = 1 + parseInt(Math.random() * 3);
        if (random === 1) {
            return 'rock';
        } else if (random === 2) {
            return 'paper';
        } else {
            return 'scissors';
        }
    } else {
        let random = 1 + parseInt(Math.random() * 5);
        if (random === 1) {
            return 'scissors';
        } else if (random === 2) {
            return 'spock';
        } else if (random === 3) {
            return 'paper';
        } else if (random === 4) {
            return 'lizard';
        } else {
            return 'rock';
        }
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
    userPickImage.src = `Images/icon-${userChoice}.svg`;
    computerPickContainer.classList.add(`${computerChoiceValue}-container`);
    computerPickImage.src = `Images/icon-${computerChoiceValue}.svg`;
}

function removeResultImage() {
    userPickContainer.classList.remove(`${userChoice}-container`);
    computerPickContainer.classList.remove(`${computerChoiceValue}-container`);
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

// Original Game logic
function originalGame() {
    computerChoiceValue = computerChoice('original');
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

// Bonus Game Logic
function bonusGame() {
    computerChoiceValue = computerChoice('bonus-game');
    if (userChoice === computerChoiceValue) {
        draw();
    } else if (userChoice === 'scissors') {
        if (computerChoiceValue === 'paper' || computerChoiceValue === 'lizard') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
    } else if (userChoice === 'paper') {
        if (computerChoiceValue === 'rock' || computerChoiceValue === 'spock') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
    } else if (userChoice === 'rock') {
        if (computerChoiceValue === 'lizard' || computerChoiceValue === 'scissors') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
    } else if (userChoice === 'lizard') {
        if (computerChoiceValue === 'spock' || computerChoiceValue === 'paper') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
    } else {
        if (computerChoiceValue === 'scissor' || computerChoiceValue === 'rock') {
            incrementScore();
            userWin();
        } else {
            decrementScore();
            userLose();
        }
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
    removeResultImage()
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
    headingLogo.src = 'Images/logo.svg';
    rulesImageElement.src = 'Images/image-rules.svg';
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
    headingLogo.src = 'Images/logo-bonus.svg';
    rulesImageElement.src = 'Images/image-rules-bonus.svg';
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




