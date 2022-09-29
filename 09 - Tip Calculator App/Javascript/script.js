'use strict';
const resetButton = document.querySelector('.reset-button');
const tipAmountElement = document.querySelector('.tip-amount');
const totalAmountElement = document.querySelector('.total-amount');
const billInputElement = document.querySelector('#bill-input');
const numberOfPersonsElement = document.querySelector('#number-input');
const tipButtons = document.querySelectorAll('.tip-button');
const tipValues = document.querySelectorAll('.tip-value');
const customTipInputElement = document.querySelector('#custom-tip');


let currentActive = 2;
// When the user clicks the reset button
resetButton.addEventListener('click', () => {
    tipAmountElement.textContent = 0.00.toFixed(2);
    totalAmountElement.textContent = 0.00.toFixed(2);
    billInputElement.value = 0;
    numberOfPersonsElement.value = 1;
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('current-active');
    }
    currentActive = -1;
    resetButton.disabled = true;
})

// When the user inputs bill value 
billInputElement.addEventListener('input', update);

// When the user inputs number of persons value
numberOfPersonsElement.addEventListener('input', update);

// When the user inputs tip value
tipButtons.forEach((tipBtn, index) => {
    tipBtn.addEventListener('click', () => {
        currentActive = index;
        // Assigning current active class to clicked button and removing current active class from other button.
        tipButtons.forEach((tipButton, index) => {
            if (index == currentActive) {
                tipButton.classList.add('current-active');
            } else {
                tipButton.classList.remove('current-active');
            }
        })

        update();
    })
})

// When the user clicks the custom tip Element
customTipInputElement.addEventListener('input', () => {
    console.log('Hello');
    // Remove the current active from 
})



// The update function for updating the contents
function update() {
    // Declaring variables 
    let billInput = Number(billInputElement.value);
    let numberOfPersons = Number(numberOfPersonsElement.value);

    if (numberOfPersons === 0) {
        // If numbers of persons == 0 then add error class to number of people element
        document.querySelector('.number-of-people').classList.add('error');
    } else if (currentActive === -1) {
        // When the user has not selected any tip
        document.querySelector('.tip-buttons').classList.add('error');
    } else {
        // Remove error class
        document.querySelector('.number-of-people').classList.remove('error');
        document.querySelector('.tip-buttons').classList.remove('error');

        // Element which has current active class
        let tipValue = document.querySelector('.current-active .tip-value').textContent;
        // Tip amount per person
        let totalTipAmount = (tipValue * billInput / 100).toFixed(2);
        tipAmountElement.textContent = (totalTipAmount / numberOfPersons).toFixed(2);

        // Total amount calculation
        let totalAmount = billInput + Number(totalTipAmount);
        //  Total amount per person
        console.log(totalAmount);
        totalAmountElement.textContent = (totalAmount / numberOfPersons).toFixed(2);
    }
}










