import data from './data.json' assert {type: 'json'};

// Mobile Navigation Toggle
const navToggle = document.querySelector('.header__mobile-nav-toggle');
const navList = document.querySelector('.header__nav-list');

// Function for hiding navigation
const hideNavigation = () => {
    navList.setAttribute('data-visible', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
};

// When the user clicks on nav toggle
navToggle.addEventListener('click', () => {
    const visibility = navList.getAttribute('data-visible');
    if (visibility === 'false') {
        navList.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');
    } else {
        navList.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// When the user clicks the escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideNavigation();
    }
});

// When the width is greater than 768 pixels
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hideNavigation();
    }
});

// General functions for links
const update = (links, currentActive) => {
    links.forEach((link, index) => {
        if (currentActive === index) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    })
}

// Destination Page
const destinationNavLinks = document.querySelectorAll('.destination__nav-link');
const destinationPlanetImage = document.querySelector('.destination__planet-image');
const destinationPlanet = document.querySelector('.destination__planet');
const destinationPlanetText = document.querySelector('.destination__planet-text');
const destinationPlanetDistance = document.querySelector('.destination__distance');
const destinationTravelTime = document.querySelector('.destination__travel-time');


destinationNavLinks.forEach((navLink, index) => {
    navLink.addEventListener('click', () => {
        update(destinationNavLinks, index);
        destinationPlanetImage.src = data.destinations[index].images.webp;
        console.log(destinationPlanetImage.src = data.destinations[index].images.webp)
        destinationPlanet.textContent = data.destinations[index].name;
        destinationPlanetText.textContent = data.destinations[index].description;
        destinationPlanetDistance.textContent = data.destinations[index].distance;
        destinationTravelTime.textContent = data.destinations[index].travel;
    })
})


// Crew Page
const crewNavLinks = document.querySelectorAll('.crew__nav-link');
const crewImage = document.querySelector('.crew__image');
const crewPersonBio = document.querySelector('.crew__person-bio');
const crewPersonPost = document.querySelector('.crew__person-post');
const crewPersonName = document.querySelector('.crew__person-name');

crewNavLinks.forEach((navLink, index) => {
    navLink.addEventListener('click', () => {
        update(crewNavLinks, index);
        crewPersonPost.textContent = data.crew[index].role;
        crewPersonName.textContent = data.crew[index].name;
        crewPersonBio.textContent = data.crew[index].bio;
        crewImage.src = data.crew[index].images.webp;
    })
})


// Technology Page
const technologyNavLinks = document.querySelectorAll('.technology__nav-link');
const technologyName = document.querySelector('.technology__name');
const technologyText = document.querySelector('.technology__text');
const technologyLandscapeImage = document.querySelector('.technology__landscape-image');
const technologyPortraitImage = document.querySelector('.technology__portrait-image');

technologyNavLinks.forEach((navLink, index) => {
    navLink.addEventListener('click', () => {
        update(technologyNavLinks, index);
        technologyName.textContent = data.technology[index].name;
        technologyText.textContent = data.technology[index].description;
        technologyLandscapeImage.src = data.technology[index].images.landscape;
        technologyPortraitImage.srcset = data.technology[index].images.portrait;
    })
})




