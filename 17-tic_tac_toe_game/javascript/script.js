'use strict';

const markSelectionButtons = document.querySelectorAll('.mark-selection__button');
const markSelectionIcons = document.querySelectorAll('.mark-selection__icon');

let userChoice;


function updateSelection() {
    markSelectionButtons.forEach((markSelectionButton, index) => {
        if (currentChoiceIndex === index) {
            markSelectionButton.classList.add('mark-selection__active-button');
            markSelectionIcons[index].src = 'images/icon-'
        } else {
            markSelectionButton.classList.remove("mark-selection__active-button");
        }
    })
}

let currentChoiceIndex = -1;
markSelectionButtons.forEach((markSelectionButton, index) => {
    markSelectionButton.addEventListener('click', () => {
        currentChoiceIndex = index;
        updateSelection();
    })
})

