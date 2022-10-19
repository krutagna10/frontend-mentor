const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const outputText = document.querySelector('.output-text');
const resetButton = document.querySelector('.reset-button');

let result = 0;
let str = '';
outputText.textContent = '';
let operatorIndexArray = [];


const updateOutputText = () => {
 outputText.textContent = str;
}

numberButtons.forEach((numberButton, index) => {
    numberButton.addEventListener('click', () => {
        let numberValue =  numberButton.textContent;
        str = str + numberValue;
        updateOutputText();
    })
})

operatorButtons.forEach((operatorButton, index) => {
    operatorButton.addEventListener('click', () => {
        console.log(operatorButton.textContent);
        let operatorValue = operatorButton.textContent;
        str = str + operatorValue;
        updateOutputText();
    })
})

resetButton.addEventListener('click', () => {
    str = '';
    outputText.textContent = str;
})

const displayResult = () => {
    outputText.textContent = result;
}

// const evaluateExpression = () => {
//     let operand1 = Number(str.slice(0, operatorIndex));
//     let operand2 = Number(str.slice(operatorIndex + 1, str.length));
//     let operatorValue = str[operatorIndex];
//
//     if (operatorValue === '+') {
//         result = operand1 + operand2;
//         str = result;
//         displayResult();
//     } else if (operatorValue === '-') {
//         result = operand1 - operand2;
//         str = result;
//         displayResult()
//     } else if (operatorValue === 'x') {
//         result = operand1 * operand2;
//         str = result;
//         displayResult()
//     } else if (operatorValue === '/') {
//         result = operand1 / operand2;
//         str = result;
//         displayResult();
//     }
// }

equalsButton.addEventListener('click', () => {
    for (const element of str) {
        if (!parseInt(element)) {
            operatorIndexArray.push(str.indexOf(element));
        }
    }
    console.log(str);
    console.log(operatorIndexArray);
})
