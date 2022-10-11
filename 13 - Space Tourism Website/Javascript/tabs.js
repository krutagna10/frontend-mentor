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


// Crew Page

const crewNavLinks = document.querySelectorAll('.crew-nav-link');
const crewImage = document.querySelector('.crew-image');
crewTextContents = document.querySelectorAll('.crew-text-content');
let currentActiveCrewLink = 0;


function updateCrewLink() {
    crewNavLinks.forEach((crewNavLink, index) => {
        if (currentActiveCrewLink === index) {
            crewNavLink.classList.add('active');
            crewTextContents[index].classList.add('current-crew-text');
        } else {
            crewNavLink.classList.remove('active');
            crewTextContents[index].classList.remove('current-crew-text');
        }
    })
}

function changeCrewPicture() {
  if (currentActiveCrewLink === 0) {
      crewImage.src = 'Images/Crew/image-douglas-hurley.webp';
  } else if (currentActiveCrewLink === 1) {
      crewImage.src = 'Images/Crew/image-mark-shuttleworth.webp'
  } else if (currentActiveCrewLink === 2) {
      crewImage.src = 'Images/Crew/image-victor-glover.webp'
  } else {
      crewImage.src = 'Images/Crew/image-anousheh-ansari.webp'
  }
}

crewNavLinks.forEach((crewNavLink, index) => {
    crewNavLink.addEventListener('click', () => {
        currentActiveCrewLink = index;
        updateCrewLink();
        changeCrewPicture();
    })
})



