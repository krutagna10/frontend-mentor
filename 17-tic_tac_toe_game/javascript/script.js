'use strict';

let player1 = {
    choice: 'x',
    score: 0,
    icon: 'images/icon-x.svg',
    iconBackground: "url('../images/icon-x.svg')",
    iconSilver: 'images/icon-x-silver.svg',
    iconDarkNavy: 'images/icon-x-dark-navy.svg',
    iconOutline: 'images/icon-x-outline.svg',
}

let player2 = {
    choice: 'o',
    score: 0,
    icon: 'images/icon-o.svg',
    iconBackground: "url('../images/icon-o.svg')",
    iconSilver: 'images/icon-o-silver.svg',
    iconDarkNavy: 'images/icon-o-dark-navy.svg',
    iconOutline: 'images/icon-o-outline.svg',
}

let userChoicesArray = [];
let computerChoicesArray = [];

let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Elements
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

// Button elements
const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const restartButton = document.querySelector('.restart-button');
const choiceButtons = document.querySelectorAll('.choice-button');
const nextRoundButton = document.querySelector('.next-round-button');
const quitButton = document.querySelector('.quit-button');

const userChoiceIcons = document.querySelector('.choice-button > img');
const hoverIcons = document.querySelectorAll('.hover-icon');

const turnIcon = document.querySelector('.current-turn__icon');
const xUser = document.querySelector('.x-user');
const oUser = document.querySelector('.o-user');
const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');
const tiesScore = document.querySelector('.ties-score');

// Initial values of user and computer
let user = player2;
let computer = player1;

// Changing hover icon according to user selection
const changeHoverIcon = () => {
    for (const hoverIcon of hoverIcons) {
        hoverIcon.src = user.iconOutline;
    }
}

const changeScoreUser = () => {
    if (user.choice === player1.choice) {
        xUser.textContent = '(You)';
        oUser.textContent = '(CPU)';
    } else {
        xUser.textContent = '(CPU)';
        oUser.textContent = '(You)';
    }
}

// Updating selection
function updateSelection() {
    markSelectionButtons.forEach((markSelectionButton, index) => {
        if (currentChoiceIndex === index) {
            markSelectionButton.classList.add('mark-selection__active-button');
            markSelectionIcons[index].src = user.iconDarkNavy;
        } else {
            markSelectionButton.classList.remove("mark-selection__active-button");
            markSelectionIcons[index].src = computer.iconSilver;
        }
    })
}

// Mark Selection
let currentChoiceIndex = -1;
markSelectionButtons.forEach((markSelectionButton, index) => {
    markSelectionButton.addEventListener('click', () => {
        if (markSelectionButton.classList.contains('x-selection')) {
            user = player1;
            computer = player2;
            changeHoverIcon();
            changeScoreUser()
        } else {
            user = player2;
            computer = player1;
            changeHoverIcon();
            changeScoreUser()
        }
        currentChoiceIndex = index;
        updateSelection();
    })
})

// When the user clicks on new game button (Player vs CPU)
newGameButton.addEventListener('click', () => {
    body.classList.add('game-active');
})

// Checking for Win
const checkForWin = (arr, player) => {
    if (arr.length >= 3) {
        arr.sort((a, b) => a - b);
        console.log(arr);
        for (const element of winConditions) {
            if (element.every(element => arr.includes(element))) {
                body.classList.add('game-finished');
                overlay.classList.remove('hidden');
                if (player === 'computer') {
                    document.querySelector('.result').textContent = 'Computer Wins';
                } else {
                    document.querySelector('.result').textContent = 'User Wins';
                }
            }
        }
    }
}

// Displaying choice icon

const displayChoice = (player, index) => {
    if (player === 'computer') {
        choiceButtons[index].style.backgroundImage = computer.iconBackground;
    } else {
        choiceButtons[index].style.backgroundImage = user.iconBackground;
    }
    choiceButtons[index].disabled = true;
}

// Updating Choices
const updateAvailableChoices = (index) => {
    availableChoices.splice(index, 1);
}

const checkForDraw = () => {
    return availableChoices.length === 0;
}

const getComputerChoice = () => {
    // Generating random number for computer Choice
    let random = availableChoices[Math.floor(Math.random() * (availableChoices.length))];

    // Displaying and updating choice
    displayChoice('computer', random);
    updateAvailableChoices(availableChoices.findIndex(element => element === random));

    // Pushing value to computer choice array
    computerChoicesArray.push(random);

    // Checking conditions
    if (checkForDraw()) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Draw';
    }

    checkForWin(computerChoicesArray, 'computer')

    turnIcon.src = user.icon;
}

choiceButtons.forEach((choiceButton, index) => {
    choiceButton.addEventListener('click', () => {
        // Displaying and updating choice
        displayChoice('user', index);
        updateAvailableChoices(availableChoices.findIndex(element => element === index));

        // Pushing value to user choices array
        userChoicesArray.push(index);

        // Checking conditions
        if (checkForDraw()) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'Draw';
        } else {
            getComputerChoice();
        }

        checkForWin(userChoicesArray, 'user')

        turnIcon.src = computer.icon;

    })
});

const resetScreen = () => {
    for (const choiceButton of choiceButtons) {
      choiceButton.style.backgroundImage = '';
        userChoicesArray = [];
        computerChoicesArray = [];
        availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        choiceButton.disabled = false;
    }
}

// Next Round Button
nextRoundButton.addEventListener('click', () => {
    body.classList.remove('game-finished');
    overlay.classList.add('hidden');
    resetScreen();
})

// Restart Button
restartButton.addEventListener('click', resetScreen);








