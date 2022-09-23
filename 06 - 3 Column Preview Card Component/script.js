const icons = document.querySelectorAll('.icon');
let currentActive = -1;
for (let icon of icons) {
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
    })
}
