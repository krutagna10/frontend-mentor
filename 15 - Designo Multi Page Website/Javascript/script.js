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
