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

let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const body = document.querySelector('body');
const hoverIcons = document.querySelectorAll('.hover-icon');
const choiceButtons = document.querySelectorAll('.choice-button');
const turnIcon = document.querySelector('.current-turn__icon');


let user = player2;
let computer = player1;

const changeHoverIcon = () => {
    for (const hoverIcon of hoverIcons) {
        hoverIcon.src = user.iconOutline;
    }
}

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

console.log(user, computer);

newGameButton.addEventListener('click', () => {
    body.classList.add('game-active');
})

let userChoicesArray = [];
let computerChoicesArray = [];

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

const displayChoice = (player, index) => {
    let image = document.createElement('img');
    player === 'computer' ? image.src = computer.icon : image.src = user.icon;
    choiceButtons[index].appendChild(image);
    choiceButtons[index].disabled = true;
}

const updateAvailableChoices = (index) => {
    availableChoices.splice(index, 1);
}


const getComputerChoice = () => {
    let random = availableChoices[Math.floor(Math.random() * (availableChoices.length))];

    displayChoice('computer', random);
    updateAvailableChoices(availableChoices.findIndex(element => element === random));

    computerChoicesArray.push(random);

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
        displayChoice('user', index);
        choiceButton.disabled = true;

        updateAvailableChoices(availableChoices.findIndex(element => element === index));

        userChoicesArray.push(index);
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







