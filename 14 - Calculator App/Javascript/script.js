'use strict'

const calculatorButtons = document.querySelectorAll('.btn');
const outputScreen = document.querySelector('.output-screen');

outputScreen.textContent = 0;

let value = [];
const index = 0;
let answer = 0;
let operator = '';

let arr = [1, 2, 3, 4, 5];

function display() {
  outputScreen.textContent = `${value.join(' ')} + ${operator}`;
}

calculatorButtons.forEach((calculatorButton, index) => {
    calculatorButton.addEventListener('click', () => {
       if (calculatorButton.classList.contains('number-btn')) {
           value[index] = Number(calculatorButton.textContent);
           index++;
           display();
       } else if (calculatorButton.classList.contains('operator')) {
           operator = calculatorButton.textContent;
           display();
       }
    })
})