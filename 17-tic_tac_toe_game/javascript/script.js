'use strict';

const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const body = document.querySelector('body');
const hoverIcons = document.querySelectorAll('.hover-icon');
const choiceButtons = document.querySelectorAll('.choice-button');

let userChoice = 'o';
let computerChoice = 'x';

const changeHoverIcon = () => {
    for (const hoverIcon of hoverIcons) {
        hoverIcon.src = `images/icon-${userChoice}-outline.svg`;
    }
}

function updateSelection() {
    markSelectionButtons.forEach((markSelectionButton, index) => {
        if (currentChoiceIndex === index) {
            markSelectionButton.classList.add('mark-selection__active-button');
            markSelectionIcons[index].src = `images/icon-${userChoice}-dark-navy.svg`;
        } else {
            markSelectionButton.classList.remove("mark-selection__active-button");
            markSelectionIcons[index].src = `images/icon-${computerChoice}-silver.svg`;
        }
    })
}

let currentChoiceIndex = -1;
markSelectionButtons.forEach((markSelectionButton, index) => {
    markSelectionButton.addEventListener('click', () => {
        if (markSelectionButton.classList.contains('x-selection')) {
            userChoice = 'x';
            computerChoice = 'o';
            changeHoverIcon();
        } else {
            userChoice = 'o';
            computerChoice = 'x';
            changeHoverIcon();
        }
        currentChoiceIndex = index;
        updateSelection();
    })
})


newGameButton.addEventListener('click', () => {
    body.classList.add('game-active');
})

let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


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
        return false;
    } else {
        return false;
    }
}

const displayChoice = (player, index) => {
    let image = document.createElement('img');
    player === 'computer' ? image.src = `images/icon-${computerChoice}.svg` : image.src = `images/icon-${userChoice}.svg`;
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
    console.log(checkForWin(computerChoicesArray))
    if (checkForWin(computerChoicesArray)) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Computer Wins';
    }
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

    })
});

// Player 1 vs Player 2






