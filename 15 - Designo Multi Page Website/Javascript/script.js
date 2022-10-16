const mainHeader = document.querySelector('.main-header');
const hamburgerButton = document.querySelector('.menu-open-button');
const closeButton = document.querySelector('.menu-close-button');

hamburgerButton.addEventListener('click', () => {
    mainHeader.classList.add('navigation-open');
})

closeButton.addEventListener('click', () => {
    mainHeader.classList.remove('navigation-open');
})