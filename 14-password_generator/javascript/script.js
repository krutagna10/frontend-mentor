'use strict';

const checkBoxElement = document.querySelectorAll('.check-box');
const lengthNumber = document.querySelector('.length-number');
const slider = document.querySelector('.character-slider');
const checkBoxes = document.querySelectorAll('.check-box');
const copyButton = document.querySelector('.copy-button');
const upperCaseCheckBox = document.querySelector('.upper-case-check-box');
const lowerCaseCheckBox = document.querySelector('.lower-case-check-box');
const includeNumbersCheckBox = document.querySelector('.include-numbers-check-box');
const includeSymbolsCheckBox = document.querySelector('.include-symbols-check-box');
const generatedPassword = document.querySelector('.generated-password');
const generateButton = document.querySelector('.generate-button');
const barsElement = document.querySelectorAll('.bar');
const barText = document.querySelector('.bar-text');
const errorMessage = document.querySelector('.error-message');

// Initially
let sliderValue = 10;
let modifiedString = '';

generatedPassword.value = 'PTx1f5DaFX';

const digits = '0123456789';
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const symbols = "!@#$%^&*(){}[]=<>/,."

let includeUpperCaseLetter = false;
let includeLowerCaseLetter = false;
let includeNumbers = false;
let includeSymbols = false;

let keysArray = [includeNumbers, includeLowerCaseLetter, includeUpperCaseLetter, includeSymbols];
let valuesArray = [digits, smallLetters, capitalLetters, symbols];

// Checkbox
for (const checkBox of checkBoxElement) {
    checkBox.addEventListener('click', () => {
        checkBox.classList.toggle('active');
    })
}

// Slider
slider.addEventListener('input', () => {
    lengthNumber.textContent = slider.value;
    sliderValue = slider.value;
})

// Copy Button
copyButton.addEventListener('click', () => {
    console.log('Hello');
})


// Password Strength
function displayPasswordStrength() {
    let strength = 0;
    for (const checkBox of checkBoxes) {
        if (checkBox.classList.contains('active')) {
            strength = strength + 1;
        }
    }

    function updateBarColor() {
        barsElement.forEach((bar, index) => {
            if (index < strength) {
                bar.classList.add('bar-active');
            } else {
                bar.classList.remove('bar-active');
            }
        })
    }

    if (strength === 0) {
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
        if (strength === 1) {
            barText.textContent = 'Too Weak!';
            updateBarColor();
        } else if (strength === 2) {
            barText.textContent = 'Weak';
            updateBarColor();
        } else if (strength === 3) {
            barText.textContent = 'Medium';
            updateBarColor();
        } else if (strength === 4) {
            barText.textContent = 'Strong';
            updateBarColor();
        }
    }
}


// Checkboxes
function userInputInformation() {
    includeUpperCaseLetter = upperCaseCheckBox.classList.contains('active');
    includeLowerCaseLetter = lowerCaseCheckBox.classList.contains('active');
    includeNumbers = includeNumbersCheckBox.classList.contains('active');
    includeSymbols = includeSymbolsCheckBox.classList.contains('active');

    keysArray = [includeNumbers, includeLowerCaseLetter, includeUpperCaseLetter, includeSymbols]
}

// Password Generator
function generatePassword() {
    modifiedString = '';
    userInputInformation();
    for (let i = 0; i < keysArray.length; i++) {
        if (keysArray[i]) {
            modifiedString = modifiedString + valuesArray[i];
        }
    }

    let password = '';
    for (let i = 0; i < sliderValue; i++) {
        let random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
        password = password + random;
    }
    displayPasswordStrength();
    generatedPassword.value = password;
}

generateButton.addEventListener('click', generatePassword);


// Copy to clipboard
const copiedText = document.querySelector(".copied-text");

copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
    let copyContent = generatedPassword.value;
    navigator.clipboard.writeText(copyContent).then(copiedText.classList.remove("hidden"));
    setTimeout(() => {
        copiedText.classList.add("hidden");
    }, 4000);
}

