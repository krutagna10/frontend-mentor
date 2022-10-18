const mainHeader = document.querySelector('.main-header')
const overlay = document.querySelector('.overlay');
const webDesignProject = document.querySelector('.web-design');
const appDesignProject = document.querySelector('.app-design');
const graphicDesignProject = document.querySelector('.graphic-design');


// Navigation
let mobileNavigationButton = document.querySelector('.mobile-navigation-button');

mobileNavigationButton.addEventListener('click', () => {
    mainHeader.classList.toggle('navigation-open');
    mobileNavigationButton.classList.toggle('active');
    overlay.classList.toggle('hidden');
});

// When the user clicks on any project container
webDesignProject.addEventListener('click', () => {
    window.location.href = 'web-design.html';
});

appDesignProject.addEventListener('click', () => {
    window.location.href = 'app-design.html';
});

graphicDesignProject.addEventListener('click', () => {
    window.location.href = 'graphic-design.html';
});