'use strict';

const navigationOpenButton = document.querySelector('.open-btn');
const navigationCloseButton = document.querySelector('.close-btn');
const header = document.querySelector('header');
const overlay = document.querySelector('.overlay');

const openNav = () => {
    header.classList.add('nav-open');
    overlay.classList.remove('hidden');
}

const closeNav = () => {
    header.classList.remove('nav-open');
    overlay.classList.add('hidden');
}

navigationOpenButton.addEventListener('click', openNav);
navigationCloseButton.addEventListener('click', closeNav);
document.addEventListener('keydown', (event) => {
    if (header.classList.contains('nav-open')) {
        if (event.key === 'Escape') {
            closeNav();
        }
    }
})

