'use strict';
const resetButton = document.querySelector('.reset-button');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const billInputElement = document.querySelector('#bill-input');
const numberOfPersonsElement = document.querySelector('#number-input');
const tipButtons = document.querySelectorAll('.tip-button');
const tipValues = document.querySelectorAll('.tip-value');

// When the user clicks the reset button
resetButton.addEventListener('click', () => {
    tipAmount.textContent = 0.00.toFixed(2);
    totalAmount.textContent = 0.00.toFixed(2);
    billInputElement.value = 0;
    numberOfPersonsElement.value = 1;
})

let billInput = Number(billInputElement.value);
let numberOfPersons = Number(numberOfPersonsElement.value);


// Total Amount per person calculations
document.querySelector('.calculate').addEventListener('click', () => {
//   Converting inputs from string to number
    billInput = Number(billInputElement.value);
    numberOfPersons = Number(numberOfPersonsElement.value);

    // Total amount per person amount
    let tempAmount = (billInput / numberOfPersons);
    totalAmount.textContent = tempAmount.toFixed(2);
})

tipButtons.forEach((tipBtn, index) => {
    tipBtn.addEventListener('click', () => {
        let tipValue = tipValues[index].textContent;
        billInput = Number(billInputElement.value);

        let tempTipAmount = (tipValue * billInput / 100);
        console.log(typeof(tempTipAmount));
        tipAmount.textContent = tempTipAmount.toFixed(2) ;
    })
})









