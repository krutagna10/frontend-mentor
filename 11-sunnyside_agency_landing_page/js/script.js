'use strict';

const header = document.querySelector('header');
const mobileNavButton = document.querySelector('.header__mobile-nav-toggle');
const overlay = document.querySelector('.overlay');

// Function for hiding mobile navigation
const hideMobileNavigation = () => {
    header.classList.remove('nav-open');
    overlay.classList.add('hidden');
};

// When the user clicks on navigation button
mobileNavButton.addEventListener('click', () => {
    header.classList.toggle('nav-open');
    overlay.classList.toggle('hidden');
});

// When the user clicks on escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMobileNavigation();
    }
});

// When the width is greater than 768 pixels
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hideMobileNavigation()
    }
});

