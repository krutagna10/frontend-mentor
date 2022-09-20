let openNavigation = document.querySelector(".open-nav");
let closeNavigation = document.querySelector(".close-nav");
let header = document.querySelector("header");

openNavigation.addEventListener("click", () => {
    header.classList.add("show-navigation");
})

closeNavigation.addEventListener("click", () => {
    header.classList.remove("show-navigation");
})