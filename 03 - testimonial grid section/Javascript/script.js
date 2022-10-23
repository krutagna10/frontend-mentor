const lightModeIcon = document.querySelector('.light-mode-icon');
const darkModeIcon = document.querySelector('.dark-mode-icon');
const body = document.querySelector('body');

darkModeIcon.addEventListener('click', () => {
    body.classList.add('dark-mode');
})

lightModeIcon.addEventListener('click', () => {
    body.classList.remove('dark-mode')
})

