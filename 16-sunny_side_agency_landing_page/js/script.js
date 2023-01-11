'use strict';

const navList = document.querySelector('.header__nav-list');
const navToggle = document.querySelector('.header__mobile-nav-toggle');
const overlay = document.querySelector('.overlay');

// Function for hiding mobile navigation
const hideMobileNavigation = () => {
    navList.setAttribute('data-visible', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
    overlay.classList.add('hidden');
};

// When the user clicks on nav toggle
navToggle.addEventListener('click', () => {
    const visibility = navList.getAttribute('data-visible');
    if (visibility === 'false') {
        navList.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');
        overlay.classList.remove('hidden');
    } else {
        navList.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        overlay.classList.add('hidden');
    }
})


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

