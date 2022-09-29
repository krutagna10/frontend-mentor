'use strict';
const resetButton = document.querySelector('.reset-button');
const tipAmountElement = document.querySelector('.tip-amount');
const totalAmountElement = document.querySelector('.total-amount');
const billInputElement = document.querySelector('#bill-input');
const numberOfPersonsElement = document.querySelector('#number-input');
const tipButtons = document.querySelectorAll('.tip-button');
const tipValues = document.querySelectorAll('.tip-value');

// When the user clicks the reset button
resetButton.addEventListener('click', () => {
    tipAmountElement.textContent = 0.00.toFixed(2);
    totalAmountElement.textContent = 0.00.toFixed(2);
    billInputElement.value = 0;
    numberOfPersonsElement.value = 1;
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('current-active');
    }
    resetButton.disabled = true;
})

tipButtons.forEach((tipBtn, index) => {
    tipBtn.addEventListener('click', () => {
        // Declaring variables 
        let billInput = Number(billInputElement.value);
        let numberOfPersons = Number(numberOfPersonsElement.value);

        // Enabling the reset button
        resetButton.disabled = false;

        // Assigning current active class to clicked button and removing current active class from other button.
        let currentActive = index;
        tipButtons.forEach((tipButton, index) => {
            if (index == currentActive) {
                tipButton.classList.add('current-active');
            } else {
                tipButton.classList.remove('current-active');
            }
        })
        // Element which has current active class
        let tipValue = document.querySelector('.current-active .tip-value').textContent;
         
        // If numbers of persons == 0 then add error class to number of people element
        if (numberOfPersons == 0) {
            document.querySelector('.number-of-people').classList.add('error');
        } else {
            // Remove error class
            document.querySelector('.number-of-people').classList.remove('error');

        // Tip amount per person
        let totalTipAmount = (tipValue * billInput / 100).toFixed(2);
        tipAmountElement.textContent = (totalTipAmount / numberOfPersons).toFixed(2);

        // Total amount calculation
        let totalAmount = billInput + Number(totalTipAmount);
        //  Total amount per person
        console.log(totalAmount);
        totalAmountElement.textContent = (totalAmount / numberOfPersons).toFixed(2);
        }
    })
})










