'use strict';
const resetButton = document.querySelector('.reset-button');
const tipAmountElement = document.querySelector('.tip-amount');
const totalAmountElement = document.querySelector('.total-amount');
const billInputElement = document.querySelector('#bill-input');
const numberOfPersonsElement = document.querySelector('#number-input');
const tipButtons = document.querySelectorAll('.tip-button');
const tipValues = document.querySelectorAll('.tip-value');
const customTipInputElement = document.querySelector('#custom-tip');
const billContainer = document.querySelector('.bill');
const personContainer = document.querySelector('.number-of-people');
const billErrorMessage = document.querySelector('.bill .error-message');
const personErrorMessage = document.querySelector('.number-of-people .error-message');
console.log(personErrorMessage);

// Initially
numberOfPersonsElement.value = 5;
billInputElement.value = 142.55;
let tipValue = 15;
let currentActive = 1;
update();

// When the user clicks the reset button
resetButton.addEventListener('click', () => {
    tipAmountElement.textContent = 0.00.toFixed(2);
    totalAmountElement.textContent = 0.00.toFixed(2);
    billInputElement.value = 0;
    numberOfPersonsElement.value = 1;
    customTipInputElement.value = '';
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('current-active');
    }
    currentActive = -1;
    resetButton.disabled = true;
    update();
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
            if (index === currentActive) {
                tipButton.classList.add('current-active');
            } else {
                tipButton.classList.remove('current-active');
            }
        })
        tipValue = document.querySelector('.current-active .tip-value').textContent;
        update();
    })
})

// When the user clicks the custom tip Element
customTipInputElement.addEventListener('input', () => {
    currentActive = 10;
    // Remove classes from all Inputs
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('current-active');
    }

    tipValue = Number(customTipInputElement.value);
    update();
})



// The update function for updating the contents
function update() {
    // Declaring variables 
    let billInput = Number(billInputElement.value);
    let numberOfPersons = Number(numberOfPersonsElement.value);

    // Enabling reset button
    resetButton.disabled = false;

    if (billInput < 0) {
        // When the value of bill is negative
        billContainer.classList.add('error');
        billErrorMessage.textContent = 'Bill cannot be negative';
    } else if (numberOfPersons === '') {
        //   If the code reaches here, then we will remove error class from bill container
        billContainer.classList.remove('error');

        // When the value of number of person is 0 or ' '
        personContainer.classList.add('error');
        personErrorMessage.textContent = "Can't be zero";
    } else if (numberOfPersons < 0) {

        //   If the code reaches here, then we will remove error class from bill container
        billContainer.classList.remove('error');

        //If there is no value in NumberOfPersons
        personContainer.classList.add('error');
        personErrorMessage.textContent = "Can't be negative";

    } else if (currentActive === -1 && billInput !== ' ') {
        //    Remove error from other classes
        billContainer.classList.remove('error');
        personContainer.classList.remove('error');

        // When the user has not selected any tip
        document.querySelector('.tip-buttons').classList.add('error');
    } else {
        // Remove error class
        billContainer.classList.remove('error');
        document.querySelector('.tip-buttons').classList.remove('error');
        personContainer.classList.remove('error');

        // Tip amount per person
        let totalTipAmount = (tipValue * billInput / 100).toFixed(2);
        tipAmountElement.textContent = (totalTipAmount / numberOfPersons).toFixed(2);

        // Total amount calculation
        let totalAmount = billInput + Number(totalTipAmount);
        //  Total amount per person
        totalAmountElement.textContent = (totalAmount / numberOfPersons).toFixed(2);
    }
}










