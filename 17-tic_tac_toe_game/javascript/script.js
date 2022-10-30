'use strict';

// Players
let player1 = {
    choice: 'x',
    icon: 'images/icon-x.svg',
    iconBackground: "url('../images/icon-x.svg')",
    iconSilver: 'images/icon-x-silver.svg',
    iconDarkNavy: 'images/icon-x-dark-navy.svg',
    iconOutline: 'images/icon-x-outline.svg',
}
let player2 = {
    choice: 'o',
    icon: 'images/icon-o.svg',
    iconBackground: "url('../images/icon-o.svg')",
    iconSilver: 'images/icon-o-silver.svg',
    iconDarkNavy: 'images/icon-o-dark-navy.svg',
    iconOutline: 'images/icon-o-outline.svg',
}

let userScore = 0;
let computerScore = 0;
let tieScore = 0;

// Choices
let userChoicesArray = [];
let computerChoicesArray = [];
let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Elements
const body = document.querySelector('body');
const gameOverlay = document.querySelector('.game-overlay');
const overlay = document.querySelector('.overlay');
const opponentThinkingText = document.querySelector('.opponent-thinking-text-wrapper');
const roundText = document.querySelector('.game-finished__round-text');
const resultText = document.querySelector('.result');
const resultIcon = document.querySelector('.result-icon');

// Button elements
const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGameButton = document.querySelector('.new-game-button');
const restartButton = document.querySelector('.restart-button');
const choiceButtons = document.querySelectorAll('.choice-button');
const nextRoundButton = document.querySelector('.next-round-button');
const quitButton = document.querySelector('.quit-button');

// Icons
const userChoiceIcons = document.querySelector('.choice-button > img');
const hoverIcons = document.querySelectorAll('.hover-icon');
const turnIcon = document.querySelector('.current-turn__icon');

//Users
const xUser = document.querySelector('.x-user');
const oUser = document.querySelector('.o-user');

//Scores
const xScoreElement = document.querySelector('.x-score');
const oScoreElement = document.querySelector('.o-score');
const tiesScoreElement = document.querySelector('.ties-score');

// Initial values of user and computer
let user = player2;
let computer = player1;

// Changing hover icon according to user selection
const changeHoverIcon = () => {
    for (const hoverIcon of hoverIcons) {
        hoverIcon.src = user.iconOutline;
    }
}

// Changing score User
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
            changeScoreUser();
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
    if (computer.choice === player1.choice) {
        getComputerChoice();
    }
})

// Displaying choice icon
const displayChoice = (player, index) => {
    if (player.choice === computer.choice) {
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


const displayResult = (winner) => {
    body.classList.add('game-finished');
    overlay.classList.remove('hidden');
    winner.choice === 'x' ? roundText.classList.add('x-won') : roundText.classList.remove('x-won');

    if (winner.choice === user.choice) {
        resultText.textContent = 'You win';
        resultIcon.src = user.icon;
        displayScore();
    } else {
        resultText.textContent = 'Oh no you lose!';
        resultIcon.src = computer.icon;
        displayScore();
    }
}

// Checking for Win
const checkForWin = (arr, player) => {
    if (arr.length >= 3) {
        arr.sort((a, b) => a - b);
        console.log(arr);
        for (const element of winConditions) {
            if (element.every(element => arr.includes(element))) {
                if (player.choice === computer.choice) {
                    computerScore = computerScore + 1;
                    setTimeout(displayResult, 1300, player);
                    return true;
                } else {
                    userScore = userScore + 1;
                    displayResult(player)
                    return true;
                }
            }
        }
        return false;
    }
    return false;
}

// Checking for draw
const checkForDraw = (player) => {
    if (availableChoices.length === 0) {
        if (player.choice === computer.choice) {
            setTimeout(() => body.classList.add('game-finished'), 1300)
        } else {
            body.classList.add('game-finished');
        }
        document.querySelector('.result').textContent = 'Draw';
        tieScore = tieScore + 1;
        displayScore()
        return true;
    } else {
        return false;
    }
}

const displayScore = () => {
    tiesScoreElement.textContent = tieScore;
    if (user.choice === 'x') {
        xScoreElement.textContent = userScore;
        oScoreElement.textContent = computerScore;
    } else {
        xScoreElement.textContent = computerScore;
        oScoreElement.textContent = userScore;
    }
}

const hideText = () => {
    opponentThinkingText.style.display = 'none';
}

const hideGameOverlay = () => {
    gameOverlay.classList.add('hidden');
}

// Get computer choice
const getComputerChoice = () => {
    turnIcon.src = user.iconSilver;

    opponentThinkingText.style.display = 'block';
    setTimeout(hideText, 1300);

    gameOverlay.classList.remove('hidden');
    setTimeout(hideGameOverlay, 1300);
    // Generating random number for computer Choice
    let random = availableChoices[Math.floor(Math.random() * (availableChoices.length))];

    // Displaying and updating choice
    setTimeout(displayChoice, 1300, computer, random);
    updateAvailableChoices(availableChoices.findIndex(element => element === random));

    // Pushing value to computer choice array
    computerChoicesArray.push(random);

    // Checking conditions
    if(!checkForWin(computerChoicesArray, computer)) {
        checkForDraw(computer);
    }

}

choiceButtons.forEach((choiceButton, index) => {
    choiceButton.addEventListener('click', () => {
        // Displaying and updating choice
        displayChoice(user, index);
        updateAvailableChoices(availableChoices.findIndex(element => element === index));

        // Pushing value to user choices array
        userChoicesArray.push(index);

        // Checking conditions
        if (!checkForWin(userChoicesArray, user) && !checkForDraw(user)) {
            getComputerChoice();
        }


        turnIcon.src = computer.iconSilver;

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


const changeUser = () => {
    if (user.choice === player1.choice) {
        user = player2;
        computer = player1;
        changeScoreUser();
        displayScore();
        getComputerChoice();
    } else {
        user = player1;
        computer = player2;
        changeScoreUser();
        displayScore();
    }

}

// Next Round Button
nextRoundButton.addEventListener('click', () => {
    body.classList.remove('game-finished');
    overlay.classList.add('hidden');
    resetScreen();
    changeUser();
    changeHoverIcon();
})

// Restart Button
restartButton.addEventListener('click', resetScreen);






