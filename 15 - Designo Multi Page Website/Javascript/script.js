'use strict';

const mainHeader = document.querySelector('.main-header')
const overlay = document.querySelector('.overlay');
const webDesignProjects = document.querySelectorAll('.web-design');
const appDesignProjects = document.querySelectorAll('.app-design');
const graphicDesignProjects = document.querySelectorAll('.graphic-design');


// Navigation
let mobileNavigationButton = document.querySelector('.mobile-navigation-button');

mobileNavigationButton.addEventListener('click', () => {
    mainHeader.classList.toggle('navigation-open');
    mobileNavigationButton.classList.toggle('active');
    overlay.classList.toggle('hidden');
});

// When the user clicks on any project container
for (const webDesignProject of webDesignProjects) {
    webDesignProject.addEventListener('click', () => {
        window.location.href = 'web-design.html';
    });
}

for (const appDesignProject of appDesignProjects) {
    appDesignProject.addEventListener('click', () => {
        window.location.href = 'app-design.html';
    });
}

for (const graphicDesignProject of graphicDesignProjects) {
    graphicDesignProject.addEventListener('click', () => {
        window.location.href = 'graphic-design.html';
    });
}


// Form Validation

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

// Validate Email
//Validate email
function validateEmail(inputEmail) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !inputEmail.match(mailFormat);
}


form.addEventListener('submit', handleForm);

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
       phoneNumberErrorMessage.textContent = "Phone-number can't be empty";
   } else if (phoneNumberValue.length !== 10) {
       phoneNumberContainer.classList.add('show-error');
       phoneNumberErrorMessage.textContent = 'Enter a valid 10 digit phone number'
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

