const lightModeIcon = document.querySelector('.icon__light-mode');
const darkModeIcon = document.querySelector('.icon__dark-mode');
const body = document.querySelector('body');

darkModeIcon.addEventListener('click', () => {
    body.classList.add('dark-mode--active');
})

lightModeIcon.addEventListener('click', () => {
    body.classList.remove('dark-mode--active')
})

