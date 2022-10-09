const mainNavLinks = document.querySelectorAll('.main-nav-link');

let currentActive = 0;
mainNavLinks.forEach((mainNavLink, index) => {
    mainNavLink.addEventListener('click', () => {
        currentActive = index;
        update();
    })
});

function update() {
    mainNavLinks.forEach((mainNavLink, index) => {
        if (currentActive === index) {
            mainNavLink.classList.add('active');
        } else {
            mainNavLink.classList.remove('active');
        }
    })
}


// Mobile Navigation
let menuButton = document.querySelector('.menu-button');
let closeButton = document.querySelector('.close-button');
menuButton.addEventListener('click', () => {
    document.querySelector('.primary-header').classList.add('navigation-open');
})

closeButton.addEventListener('click', () => {
    document.querySelector('.primary-header').classList.remove('navigation-open');
})


