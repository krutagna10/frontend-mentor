'use strict';

// Players
let xElement = {
    choice: 'x',
    icon: 'images/icon-x.svg',
    iconBackground: "url('../images/icon-x.svg')",
    iconSilver: 'images/icon-x-silver.svg',
    iconDarkNavy: 'images/icon-x-dark-navy.svg',
    iconOutline: 'images/icon-x-outline.svg',
}
let oElement = {
    choice: 'o',
    icon: 'images/icon-o.svg',
    iconBackground: "url('../images/icon-o.svg')",
    iconSilver: 'images/icon-o-silver.svg',
    iconDarkNavy: 'images/icon-o-dark-navy.svg',
    iconOutline: 'images/icon-o-outline.svg',
}

// Initial values of user/computer and player1 and player2
let user = oElement;
let computer = xElement;
let player1 = oElement;
let player2 = xElement

let userScore = 0;
let computerScore = 0;
let tieScore = 0;

let player1Score = 0;
let player2Score = 0;

let playerVsPlayer = false;
let playerVsCpu = false;

// Choices
let userChoicesArray = [];
let computerChoicesArray = [];
let player1ChoicesArray = [];
let player2ChoicesArray = [];

let availableChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Elements
const body = document.querySelector('body');
const gameFinishedSection = document.querySelector('.game-finished-section');
const gameOverlay = document.querySelector('.game-overlay');
const overlay = document.querySelector('.overlay');
const opponentThinkingText = document.querySelector('.opponent-thinking-text-wrapper');
const roundText = document.querySelector('.game-finished__round-text');
const resultWrapper = document.querySelector('.result-wrapper');
const resultText = document.querySelector('.result');
const resultIcon = document.querySelector('.result-icon');

// Button elements
const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');
const newGamePlayerVsCpu = document.querySelector('.new-game-button.player-vs-cpu');
const newGamePlayerVsPlayer = document.querySelector('.new-game-button.player-vs-player');
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


// Changing hover icon according to user selection
const changeHoverIcon = (currentPlayer) => {
    if (playerVsCpu) {
        for (const hoverIcon of hoverIcons) {
            hoverIcon.src = user.iconOutline;
        }
    } else {
        for (const hoverIcon of hoverIcons) {
            if (currentPlayer.choice === player1.choice) {
                hoverIcon.src = player1.iconOutline;
            } else {
                hoverIcon.src = player2.iconOutline;
            }
        }
    }
}

// Changing score User
const changeScoreUser = () => {
    if (user.choice === xElement.choice) {
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
            user = xElement;
            computer = oElement;
            changeHoverIcon();
            changeScoreUser();
        } else {
            user = oElement;
            computer = xElement;
            changeHoverIcon();
            changeScoreUser()
        }
        currentChoiceIndex = index;
        updateSelection();
    })
})

// When the user clicks on new game button (Player vs CPU)
newGamePlayerVsCpu.addEventListener('click', () => {
    body.classList.add('game-active');
    playerVsCpu = true;
    playerVsPlayer = false;
    if (computer.choice === xElement.choice) {
        showElements();
        setTimeout(getComputerChoice, 1300);
    }
})

newGamePlayerVsPlayer.addEventListener('click', () => {
    playerVsPlayer = true;
    playerVsCpu = false;
    body.classList.add('game-active');
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
    // Removing draw classes
    gameFinishedSection.classList.remove('draw');
    // Adding game-finished classes
    body.classList.add('game-finished');
    overlay.classList.remove('hidden');
    winner.choice === 'x' ? roundText.classList.add('x-won') : roundText.classList.remove('x-won');
    displayScore();
    if (winner.choice === user.choice) {
        resultText.textContent = 'You won!';
        resultIcon.src = user.icon;
    } else {
        resultText.textContent = 'Oh no, you lost!';
        resultIcon.src = computer.icon;
    }
}

// Checking for Win
const checkForWin = (arr, player) => {
    if (playerVsCpu) {
        for (const element of winConditions) {
            if (element.every(element => arr.includes(element))) {
                player.choice === computer.choice ? computerScore = computerScore + 1 : userScore = userScore + 1;
                displayResult(player);
                return true;
            }
        }
    } else {
        for (const element of winConditions) {
            if (element.every(element => arr.includes(element))) {
                player.choice === player1.choice ? player1Score = player1Score + 1 : player2Score = player2Score + 1;
                displayResult(player);
                return true;
            }
        }
    }

}

// Checking for draw
const checkForDraw = () => {
    if (availableChoices.length === 0) {
        body.classList.add('game-finished');
        gameFinishedSection.classList.add('draw');
        tieScore = tieScore + 1;
        displayScore();
        return true;
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

const showElements = () => {
    gameOverlay.classList.remove('hidden');
    opponentThinkingText.style.display = 'block';
}

// Get computer choice
const getComputerChoice = () => {
    // Turn icon
    turnIcon.src = user.iconSilver;


    // When the computer is making its choice
    opponentThinkingText.style.display = 'none';
    gameOverlay.classList.add('hidden');

    // Generating random number for computer Choice
    let random = availableChoices[Math.floor(Math.random() * (availableChoices.length))];

    // Displaying and updating choice
    displayChoice(computer, random);
    updateAvailableChoices(availableChoices.findIndex(element => element === random));

    // Pushing value to computer choice array
    computerChoicesArray.push(random);

    // Checking conditions
    if (!checkForWin(computerChoicesArray, computer)) {
        checkForDraw(computer);
    }

}

let player1Active = true;
let player2Active = false;

choiceButtons.forEach((choiceButton, index) => {
    choiceButton.addEventListener('click', () => {
        if (playerVsCpu) {
            // Displaying and updating choice
            displayChoice(user, index);
            updateAvailableChoices(availableChoices.findIndex(element => element === index));

            // Pushing value to user choices array
            userChoicesArray.push(index);

            // Checking conditions
            if (!checkForWin(userChoicesArray, user) && !checkForDraw(user)) {
                showElements();
                setTimeout(getComputerChoice, 1300);
            }


            // Turn icon
            turnIcon.src = computer.iconSilver;
        } else {
            if (player1Active) {
                displayChoice(player1, index);
                updateAvailableChoices(availableChoices.findIndex(element => element === index));
                player1ChoicesArray.push(index);

                checkForWin(player1ChoicesArray, player1);


                // Change Active Player
                player1Active = false;
                player2Active = true;
                setTimeout(changeHoverIcon, 500, player2);
            } else {
                displayChoice(player2, index);
                updateAvailableChoices(availableChoices.findIndex(element => element === index));
                player1ChoicesArray.push(index);

                checkForWin(player2ChoicesArray, player2);

                // Change Active Player
                player1Active = true;
                player2Active = false;
                setTimeout(changeHoverIcon, 500, player1);
            }
        }

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
    if (user.choice === xElement.choice) {
        user = oElement;
        computer = xElement;
        changeScoreUser();
        displayScore();
        showElements();
        setTimeout(getComputerChoice, 1300);
    } else {
        user = xElement;
        computer = oElement;
        changeScoreUser();
        displayScore();
    }
    changeHoverIcon();

}

// Next Round Button
nextRoundButton.addEventListener('click', () => {
    body.classList.remove('game-finished');
    overlay.classList.add('hidden');
    resetScreen();
    changeUser();
})

// Restart Button
restartButton.addEventListener('click', resetScreen);








