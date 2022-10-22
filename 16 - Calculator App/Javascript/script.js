'use strict';

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const outputText = document.querySelector('.output-text');
const resetButton = document.querySelector('.reset-button');
const deleteButton = document.querySelector('.delete-button');

let operatorIndex = -1;
let str = '';
outputText.textContent = '';
let arr = [];

const updateOutputText = () => {
    outputText.textContent = str;
}


const findOperatorIndex = () => {
    for (const element of str) {
        if (parseInt(element) !== 0 && !parseInt(element)) {
            operatorIndex = str.indexOf(element);
        }
    }
}

const evaluateExpression = () => {
    let operatorValue = str.charAt(operatorIndex);
    let numbersArray = str.split(operatorValue);

    let operand1 = Number(numbersArray[0]);
    let operand2 = Number(numbersArray[1]);

    if (operatorValue === '+') {
        let result = (operand1 + operand2).toFixed(5);
        str = String(result);
        updateOutputText();
    } else if (operatorValue === '-') {
        let result = (operand1 - operand2).toFixed(5);
        str = String(result);
        updateOutputText()
    } else if (operatorValue === 'x') {
        let result = (operand1 * operand2).toFixed(5);
        str = String(result);
        updateOutputText()
    } else if (operatorValue === '/') {
        let result = (operand1 / operand2).toFixed(5);
        str = String(result);
        updateOutputText();
    }
}

numberButtons.forEach((numberButton, index) => {
    numberButton.addEventListener('click', () => {
        let numberValue = numberButton.textContent;
        str = str + numberValue;
        updateOutputText();
    })
})

operatorButtons.forEach((operatorButton, index) => {
    operatorButton.addEventListener('click', () => {
        let lastStrCharacter = parseInt(str.charAt(str.length - 1));

        // So that User cannot click on operator two times in a row
        if (lastStrCharacter || lastStrCharacter === 0) {
            arr.push(str);
            findOperatorIndex();
            if (arr.length >= 2) {
                evaluateExpression()
            }
            let operatorValue = operatorButton.textContent;
            str = str + operatorValue;
            updateOutputText();

        }
    })
})

// Equals Button
equalsButton.addEventListener('click', () => {
    findOperatorIndex();
    evaluateExpression();
})


// Reset Button
resetButton.addEventListener('click', () => {
    str = '';
    outputText.textContent = str;
})


// Deleter Button
deleteButton.addEventListener('click', () => {
    str = str.replace(str.charAt(str.length - 1), '');
    updateOutputText();
})