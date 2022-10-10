// Destination Page
const destinationPlanets = document.querySelectorAll('.destination-planet');
const secondaryNavLinks = document.querySelectorAll('.secondary-nav-link');
const planetImage = document.querySelector('.planet-image');
let currentDestinationLink = 0;
let currentDestination = 0;
let currentImage = 'moon';

function update() {
    secondaryNavLinks.forEach((navLink, index) => {
        if (currentDestinationLink === index) {
            navLink.classList.add('active-link');
            destinationPlanets[index].classList.add('current-active-destination');
        } else {
            navLink.classList.remove('active-link');
            destinationPlanets[index].classList.remove('current-active-destination');
        }
    })
}

function changePlanetImage() {
    planetImage.src = `Images/Destination/image-${currentImage}.webp`;
}

secondaryNavLinks.forEach((navLink, index) => {
    navLink.addEventListener('click', () => {
        currentDestinationLink = index;
        currentDestination = index;
        currentImage = navLink.textContent.toLowerCase();
        changePlanetImage();
        update();

    })
})




