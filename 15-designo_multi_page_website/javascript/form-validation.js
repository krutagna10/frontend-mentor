'use strict';

const inputContainers = document.querySelectorAll('.contact__input-wrapper');

const nameContainer = document.querySelector('.contact__name-wrapper')
const emailContainer = document.querySelector('.contact__email-wrapper');
const phoneNumberContainer = document.querySelector('.contact__number-wrapper');
const messageContainer = document.querySelector('.contact__message-wrapper');

const nameElement = document.querySelector('#contact__name');
const emailElement = document.querySelector('#contact__email');
const phoneNumberElement = document.querySelector('#contact__phone-number');
const messageElement = document.querySelector('#contact__message');
const formSubmitButton = document.querySelector('.contact__submit-btn');
const form = document.querySelector('.contact__form');
const inputs = document.querySelectorAll('.contact__form-input');
const phoneNumberErrorMessage = document.querySelector('.contact__error-message--phone');

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

