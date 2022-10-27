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

const gameWrapper = document.querySelector('.game__wrapper');
const choiceButtons = document.querySelectorAll('.choice-button');

let userChoicesArray = [];
let computerChoicesArray = [];

const checkForWin = (arr) => {
    if (arr.length >= 3) {
        arr.splice(0, arr.length - 3);
        arr.sort((a, b) => a - b);

        let diff = arr[1] - arr[0];
        let answer = false;
        for (let i = 2; i < arr.length; i++) {
            if (diff !== arr[i] - arr[i - 1]) {
                return answer;
            }
        }
        return true;
    } else {
        return false;
    }
}



const pickComputerChoice = () => {
        let computerChoiceImage = document.createElement('img');
        computerChoiceImage.src = `images/icon-${computerChoice}.svg`;
        let random = options[parseInt(Math.random() * (options.length))];
        choiceButtons[random].appendChild(computerChoiceImage);
        choiceButtons[random].disabled = true;

        let arrayIndex = options.findIndex((element) => element === random);
        options.splice(arrayIndex, 1);

        computerChoicesArray.push(random);
        console.log(computerChoicesArray);

    if (checkForWin(computerChoicesArray)) {
        body.classList.add('game-finished');
        document.querySelector('.result').textContent = 'Computer Wins';
    }

}

choiceButtons.forEach((choiceButton, index) => {
    choiceButton.addEventListener('click', () => {
            let image = document.createElement('img');
            image.src = `images/icon-${userChoice}.svg`;
            choiceButton.appendChild(image);
            choiceButton.disabled = true;

            let arrayIndex = options.findIndex((element) => element === index);
            options.splice(arrayIndex, 1);

            userChoicesArray.push(index);
            pickComputerChoice();

        if (checkForWin(userChoicesArray)) {
            body.classList.add('game-finished');
            document.querySelector('.result').textContent = 'User Wins';
        }

    })
});


