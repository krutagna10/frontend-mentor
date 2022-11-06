'use strict';

const mainHeader = document.querySelector('.header-section')
const overlay = document.querySelector('.overlay');
const webDesignProjects = document.querySelectorAll('.service--web-design');
const appDesignProjects = document.querySelectorAll('.service--app-design');
const graphicDesignProjects = document.querySelectorAll('.service--graphic-design');

// Navigation
let openNavigationButton = document.querySelector('.header__nav-open-btn');
let closeNavigationButton = document.querySelector('.header__nav-close-btn');

openNavigationButton.addEventListener('click', () => {
    mainHeader.classList.add('navigation-open');
    overlay.classList.remove('hidden');
})

closeNavigationButton.addEventListener('click', () => {
    mainHeader.classList.remove('navigation-open');
    overlay.classList.add('hidden');
})

// Removing overlay
const hideMobileNavigation = () => {
    overlay.classList.add('hidden');
    mainHeader.classList.remove('navigation-open');
}

// When the user click on escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideMobileNavigation();
    }
})

// When the width is greater than 768 pixels
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        hideMobileNavigation()
    }
});



// When the user clicks on any project container
for (const webDesignProject of webDesignProjects) {
    webDesignProject.addEventListener('click', () => {
        window.location.href = 'pages/web-design.html';
    });
}

for (const appDesignProject of appDesignProjects) {
    appDesignProject.addEventListener('click', () => {
        window.location.href = 'pages/app-design.html';
    });
}

for (const graphicDesignProject of graphicDesignProjects) {
    graphicDesignProject.addEventListener('click', () => {
        window.location.href = 'pages/graphic-design.html';
    });
}



