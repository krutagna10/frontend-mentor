'use strict';

const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const body = document.querySelector('body');

let userChoice = 'o';
let computerChoice = 'x';

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
        } else {
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

let options = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const gameWrapper = document.querySelector('.game__wrapper');
const choiceButtons = document.querySelectorAll('.choice-button');

let userChoicesArray = [];
let computerChoicesArray = [];

const checkForWin = (arr) => {
    if (arr.length >= 3) {
        arr.sort((a, b) => a - b);
        console.log(arr);
        for (const element of winArray) {
            if (arr.toString().includes(element.toString())) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}


const getComputerChoice = () => {
    let computerChoiceImage = document.createElement('img');
    computerChoiceImage.src = `images/icon-${computerChoice}.svg`;
    let random = options[parseInt(Math.random() * (options.length))];
    choiceButtons[random].appendChild(computerChoiceImage);
    choiceButtons[random].disabled = true;

    let arrayIndex = options.findIndex((element) => element === random);
    options.splice(arrayIndex, 1);
    computerChoicesArray.push(random);

    if (options.length === 0) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Draw';
    }

    if (checkForWin(computerChoicesArray)) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Computer Wins';
    }

}


function game() {
    if (userChoice === 'o') {
        getComputerChoice();
    }
}

game();


choiceButtons.forEach((choiceButton, index) => {
    choiceButton.addEventListener('click', () => {
        let image = document.createElement('img');
        image.src = `images/icon-${userChoice}.svg`;
        choiceButton.appendChild(image);
        choiceButton.disabled = true;

        let arrayIndex = options.findIndex((element) => element === index);
        options.splice(arrayIndex, 1);

        userChoicesArray.push(index);
        if (options.length === 0) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'Draw';
        } else {
            getComputerChoice();
        }

        if (checkForWin(userChoicesArray)) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'User Wins';
        }

    })
});






