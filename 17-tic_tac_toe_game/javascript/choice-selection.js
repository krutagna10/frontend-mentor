'use strict';

const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const body = document.querySelector('body');

let userChoice;
let computerChoice;


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
        }  else {
            userChoice = 'o';
            computerChoice = 'x';
        }
        currentChoiceIndex = index;
        updateSelection();
    })
})


newGameButton.addEventListener('click', () => {
    body.classList.add('game-active');
})
