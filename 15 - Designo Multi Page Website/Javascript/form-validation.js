'use strict';

const inputContainers = document.querySelectorAll('.input-container');
const nameContainer = document.querySelector('.name-container')
const emailContainer = document.querySelector('.email-container');
const phoneNumberContainer = document.querySelector('.phone-number-container');
const messageContainer = document.querySelector('.message-container');
const nameElement = document.querySelector('#person-name');
const phoneNumberElement = document.querySelector('#phone-number');
const emailElement = document.querySelector('#email-address');
const messageElement = document.querySelector('#message');
const formSubmitButton = document.querySelector('.submit-button');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input');
const phoneNumberErrorMessage = document.querySelector('.phone-number-container .error-message');

// Stop form from refreshing page on submit
function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);

// Validate Email
function validateEmail(inputEmail) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !inputEmail.match(mailFormat);
}

// Form Validation
formSubmitButton.addEventListener('click', () => {
    let nameValue = nameElement.value;
    let emailValue = emailElement.value;
    let phoneNumberValue = phoneNumberElement.value;
    let messageValue = messageElement.value;

    if (nameValue === '') {
        nameContainer.classList.add('show-error');
    } else {
        nameContainer.classList.remove('show-error');
    }

    if (validateEmail(emailValue)) {
        emailContainer.classList.add('show-error');
    } else {
        emailContainer.classList.remove('show-error');
    }

    if (phoneNumberValue === '') {
        phoneNumberContainer.classList.add('show-error');
        phoneNumberErrorMessage.textContent = "Can't be empty";
    } else if (phoneNumberValue.length !== 10) {
        phoneNumberContainer.classList.add('show-error');
        phoneNumberErrorMessage.textContent = 'Not Valid'
    } else {
        phoneNumberContainer.classList.remove('show-error');
    }

    if (messageValue === '') {
        messageContainer.classList.add('show-error');
    } else {
        messageContainer.classList.remove('show-error');
    }

})

let currentActive = -1;

const removeCurrentActiveError = () => {
    inputContainers.forEach((inputContainer, index) => {
        if (currentActive === index) {
            if (inputContainer.classList.contains('show-error')) {
                inputContainer.classList.remove('show-error');
            }
        }
    })
}

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        currentActive = index;
        removeCurrentActiveError();
    })
})

