const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const outputText = document.querySelector('.output-text');
const resetButton = document.querySelector('.reset-button');
const deleteButton = document.querySelector('.delete-button');

let result = 0;
let operatorIndex = -1;
let str = '';
outputText.textContent = '';
let arr = [];


const updateOutputText = () => {
 outputText.textContent = str;
}

const displayResult = () => {
    outputText.textContent = result;
}

const findOperatorIndex = () => {
    for (const element of str) {
        if (parseInt(element) !== 0 && !parseInt(element)) {
            operatorIndex = str.indexOf(element);
        }
    }
}

const evaluateExpression = () => {
    let operand1 = Number(str.slice(0, operatorIndex));
    let operand2 = Number(str.slice(operatorIndex + 1, str.length));
    let operatorValue = str[operatorIndex];

    if (operatorValue === '+') {
        result = operand1 + operand2;
        str = String(result);
        displayResult();
    } else if (operatorValue === '-') {
        result = operand1 - operand2;
        str = String(result);
        displayResult()
    } else if (operatorValue === 'x') {
        result = operand1 * operand2;
        str = String(result);
        displayResult()
    } else if (operatorValue === '/') {
        result = operand1 / operand2;
        str = String(result);
        displayResult();
    }
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
        arr.push(str);
        findOperatorIndex();
        if (arr.length >= 2) {
            evaluateExpression()
        }
        let operatorValue = operatorButton.textContent;
        str = str + operatorValue;
        updateOutputText();

    })
})

resetButton.addEventListener('click', () => {
    str = '';
    outputText.textContent = str;
})


equalsButton.addEventListener('click', () => {
    findOperatorIndex();
    evaluateExpression();
})

deleteButton.addEventListener('click', () => {
    str = str.replace(str.charAt(str.length - 1), '');
    updateOutputText();
})