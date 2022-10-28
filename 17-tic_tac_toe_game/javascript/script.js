'use strict';

let player1 = {
    choice: 'x',
    icon: 'images/icon-x.svg',
    iconSilver: 'images/icon-x-silver.svg',
    iconDarkNavy: 'images/icon-x-dark-navy.svg',
    iconOutline: 'images/icon-x-outline.svg',
}

let player2 = {
    choice: 'o',
    icon: 'images/icon-o.svg',
    iconSilver: 'images/icon-o-silver.svg',
    iconDarkNavy: 'images/icon-o-dark-navy.svg',
    iconOutline: 'images/icon-o-outline.svg',
}

let userChoicesArray = [];
let computerChoicesArray = [];

let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Elements
const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const body = document.querySelector('body');
const hoverIcons = document.querySelectorAll('.hover-icon');
const choiceButtons = document.querySelectorAll('.choice-button');
const turnIcon = document.querySelector('.current-turn__icon');

// Initial values of user and computer
let user = player2;
let computer = player1;

// Changing hover icon according to user selection
const changeHoverIcon = () => {
    for (const hoverIcon of hoverIcons) {
        hoverIcon.src = user.iconOutline;
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
        } else {
            user = player2;
            computer = player1;
            changeHoverIcon();
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
const checkForWin = (arr) => {
    if (arr.length >= 3) {
        arr.sort((a, b) => a - b);
        console.log(arr);
        for (const element of winConditions) {
            if (element.every(element => arr.includes(element))) {
                return true;
            }
        }
    }
}

// Displaying choice icon
const displayChoice = (player, index) => {
    let image = document.createElement('img');
    player === 'computer' ? image.src = computer.icon : image.src = user.icon;
    choiceButtons[index].appendChild(image);
    choiceButtons[index].disabled = true;
}

// Updating Choices
const updateAvailableChoices = (index) => {
    availableChoices.splice(index, 1);
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
    if (availableChoices.length === 0) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Draw';
    }

    if (checkForWin(computerChoicesArray)) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Computer Wins';
    }

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
        if (availableChoices.length === 0) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'Draw';
        } else {
            getComputerChoice();
        }

        console.log(checkForWin(userChoicesArray))
        if (checkForWin(userChoicesArray)) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'User Wins';
        }

        turnIcon.src = computer.icon;

    })
});







