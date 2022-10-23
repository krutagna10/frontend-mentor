'use strict';

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const outputText = document.querySelector('.output-text');
const resetButton = document.querySelector('.reset-button');
const deleteButton = document.querySelector('.delete-button');
const body = document.querySelector('body');
const theme1Input = document.querySelector('#theme-1-radio');
const theme2Input = document.querySelector('#theme-2-radio');
const theme3Input = document.querySelector('#theme-3-radio');
const themeCheckMarks = document.querySelectorAll('.theme-checkmark');
const multiplicationOperatorButton = document.querySelector('.operator-button.multiplication');

multiplicationOperatorButton.textContent = "\u00D7";

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
        str = String((operand1 + operand2));
        updateOutputText();
    } else if (operatorValue === '-') {
        str = String((operand1 - operand2));
        updateOutputText()
    } else if (operatorValue === '/') {
        str = String((operand1 / operand2));
        updateOutputText();
    } else if (operatorValue === "\u00D7") {
        str = String((operand1 * operand2));
        updateOutputText()
    }
}

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        let numberValue = numberButton.textContent;
        str = str + numberValue;
        updateOutputText();
    })
})

operatorButtons.forEach((operatorButton) => {
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
    console.log(str);
    str = str.replace(str.charAt(str.length - 1), '');
    updateOutputText();
})

// Theme Toggle
let currentActive = -1;

const updateThemeCheckMarks = () => {
    themeCheckMarks.forEach((themeCheckMark, index) => {
        if (currentActive === index) {
            themeCheckMark.classList.add('current-active');
        } else {
            themeCheckMark.classList.remove('current-active');
        }
    })
}

const updateClasses = () => {
    for (let index = 0; index < 3; index++) {
        if (currentActive === index) {
            body.classList.add(`theme-${index + 1}-active`);
        } else {
            body.classList.remove(`theme-${index + 1}-active`);
        }
    }
}

theme1Input.addEventListener('click', () => {
    //Theme Checkmark
    currentActive = 0;
    updateThemeCheckMarks();

    // Updating classes
    updateClasses();

})

theme2Input.addEventListener('click', () => {
    //Theme Checkmark
    currentActive = 1;
    updateThemeCheckMarks();

    // Updating classes
    updateClasses();

})

theme3Input.addEventListener('click', () => {
    //Theme Checkmark
    currentActive = 2;
    updateThemeCheckMarks();

    // Updating classes
    updateClasses();
});

