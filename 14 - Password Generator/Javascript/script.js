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
let random = -1;
const digits = '0123456789';
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const symbols = "!@#$%^&*(){}[]=<>/,."

let includeUpperCaseLetter = false;
let includeLowerCaseLetter = false;
let includeNumbers = false;
let includeSymbols = false;


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

// Checkboxes
function userInputInformation() {
    includeUpperCaseLetter = upperCaseCheckBox.classList.contains('active');
    includeLowerCaseLetter = lowerCaseCheckBox.classList.contains('active');
    includeNumbers = includeNumbersCheckBox.classList.contains('active');
    includeSymbols = includeSymbolsCheckBox.classList.contains('active');
}

// Password Generator
function generatePassword() {
    let password = '';
    for (let i = 0; i < sliderValue; i++) {
        userInputInformation();
        if (includeSymbols && includeNumbers && includeLowerCaseLetter && includeUpperCaseLetter) {
            modifiedString = digits + capitalLetters + smallLetters + symbols;
            random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
            password = password + random;
        } else if (includeUpperCaseLetter && includeLowerCaseLetter && includeNumbers) {
            modifiedString = digits + capitalLetters + smallLetters;
            random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
            password = password + random;
        } else if (includeUpperCaseLetter && includeLowerCaseLetter) {
            modifiedString = capitalLetters + smallLetters;
            random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
            password = password + random;

        } else if (includeUpperCaseLetter && includeNumbers) {
            modifiedString = capitalLetters + digits;
            random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
            password = password + random;
        } else if (includeLowerCaseLetter && includeNumbers) {
            modifiedString = smallLetters + digits;
            random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
            password = password + random;
        } else if (includeUpperCaseLetter) {
            random = capitalLetters.charAt(parseInt(Math.random() * (capitalLetters.length - 1)));
            password = password + random;

        } else if (includeLowerCaseLetter) {
            random = smallLetters.charAt(parseInt(Math.random() * (smallLetters.length - 1)));
            password = password + random;

        } else if (includeNumbers) {
            random = digits.charAt(Math.random() * (digits.length - 1));
            password = password + random;
        }
    }
    generatedPassword.textContent = password;
}

generateButton.addEventListener('click', generatePassword);
