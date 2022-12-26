const claimButton = document.querySelector('.claim-button');
const firstNameInputElement = document.querySelector('#first-name');
const lastNameInputElement = document.querySelector('#last-name');
const emailInputElement = document.querySelector('#input-email');
const passwordInputElement = document.querySelector('#password-input');
const form = document.querySelector('.form');
//Input Boxes
const firstNameInputBox = document.querySelector('.first-name-input-box');
const lastNameInputBox = document.querySelector('.last-name-input-box');
const emailInputBox = document.querySelector('.email-input-box');
const passwordInputBox = document.querySelector('.password-input-box');

// Stop form from refreshing page on submit
function handleForm(event) {
    event.preventDefault();
}

form.addEventListener('submit', handleForm);

//Validate email
function validateEmail(inputEmail) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !inputEmail.match(mailFormat);
}

// When the user clicks on claim Button
claimButton.addEventListener('click', () => {
    let firstNameValue = firstNameInputElement.value;
    let lastNameValue = lastNameInputElement.value;
    let emailValue = emailInputElement.value;
    let passwordValue = passwordInputElement.value;
    console.log(emailValue);

    if (firstNameValue === '') {
        firstNameInputBox.classList.add('error');
    } else if (lastNameValue === '') {
        //Removing error from first name
        firstNameInputBox.classList.remove('error');
        // Adding error to last name input box
        lastNameInputBox.classList.add('error');
    } else if (validateEmail(emailValue)) {
        //Removing errors
        firstNameInputBox.classList.remove('error');
        lastNameInputBox.classList.remove('error');
        // Adding error to input box
        emailInputBox.classList.add('error');
    } else if (passwordValue === '') {
        //Removing errors
        firstNameInputBox.classList.remove('error');
        lastNameInputBox.classList.remove('error');
        emailInputBox.classList.remove('error');
        // Adding error to password box
        passwordInputBox.classList.add('error');
    } else if (passwordValue.length < 8) {
        // Removing Errors
        firstNameInputBox.classList.remove('error');
        lastNameInputBox.classList.remove('error');
        emailInputBox.classList.remove('error')
        // Adding error class
        passwordInputBox.classList.add('error');
        document.querySelector('.password-input-box .error-message').textContent = 'Password cannot be less than 8 characters'
    } else {
        firstNameInputBox.classList.remove('error');
        lastNameInputBox.classList.remove('error');
        emailInputBox.classList.remove('error');
        passwordInputBox.classList.remove('error');
    }

})


