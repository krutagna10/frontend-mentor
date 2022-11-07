let openNavigation = document.querySelector(".header__open-nav-btn");
let closeNavigation = document.querySelector(".header__close-nav-btn");
let header = document.querySelector(".header-section");

openNavigation.addEventListener("click", () => {
    header.classList.add("show-navigation");
    document.querySelector('.overlay').classList.remove('hidden');
})

closeNavigation.addEventListener("click", () => {
    header.classList.remove("show-navigation");
    document.querySelector('.overlay').classList.add('hidden');
})