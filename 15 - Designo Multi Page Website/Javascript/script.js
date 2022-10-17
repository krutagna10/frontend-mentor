const mainHeader = document.querySelector('.main-header')
const overlay = document.querySelector('.overlay');

let mobileNavigationButton = document.querySelector('.mobile-navigation-button');

mobileNavigationButton.addEventListener('click', () => {
    mainHeader.classList.toggle('navigation-open');
    mobileNavigationButton.classList.toggle('active');
    overlay.classList.toggle('hidden');
})
