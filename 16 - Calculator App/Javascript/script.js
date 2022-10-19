const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const outputText = document.querySelector('.output-text');
const resetButton = document.querySelector('.reset-button');

const result = 0;
let str = '';
outputText.textContent = 0;

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
    outputText.textContent = 0;
})

const evaluateExpression = () => {
    for (const element of str) {
        if (typeof(Number(element)) === 'number') {
            console.log(`${element} is number`);
        } else {
            console.log(`${element} is not a number`);
        }
    }
}

equalsButton.addEventListener('click', () => {
  evaluateExpression();
})
