'use strict';

const checkBoxElement = document.querySelectorAll('.check-box');
const lengthNumber = document.querySelector('.length-number');
const slider = document.querySelector('.character-slider');
const upperCaseCheckBox = document.querySelector('.upper-case-check-box');
const lowerCaseCheckBox = document.querySelector('.lower-case-check-box');
const includeNumbersCheckBox = document.querySelector('.include-numbers-check-box');
const includeSymbolsCheckBox = document.querySelector('.include-symbols-check-box');
const generatedPassword = document.querySelector('.generated-password');
const generateButton = document.querySelector('.generate-button');

let sliderValue = 10;
let modifiedString = '';

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


// Password Strength


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
    generatedPassword.textContent = password;
}

generateButton.addEventListener('click', generatePassword);


