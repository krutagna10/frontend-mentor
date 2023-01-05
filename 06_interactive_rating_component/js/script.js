'use strict';

const ratings = document.querySelectorAll('.rating-card__rating');
const ratingLabels = document.querySelectorAll('.rating-card__label');
const ratingCardSection = document.querySelector('.rating-card-section');
const ratingChoice = document.querySelector('.rating-card__choice');
const errorMessage = document.querySelector('.rating-card__error-message');
const rateAgainButton = document.querySelector('.rating-card__btn--again');
const submitButton = document.querySelector('.rating-card__btn--submit');

let currentActive = -1;
let userRating = 0;

const update = () => {
    ratingLabels.forEach((ratingLabel, index) => {
        if (currentActive === index) {
            ratingLabel.classList.add('active');
            userRating = ratingLabel.textContent;
        } else {
            ratingLabel.classList.remove('active');
        }
    })
}

ratings.forEach((rating, index) => {
    rating.addEventListener('click', () => {
        currentActive = index;
        update();
        errorMessage.classList.add('hidden');
    })
})


submitButton.addEventListener('click', () => {
    if (userRating === 0) {
        errorMessage.classList.remove('hidden');
    } else {
        ratingCardSection.classList.add('ratings-submitted');
        errorMessage.classList.add('hidden');
        ratingChoice.textContent = userRating;
    }
})

rateAgainButton.addEventListener('click', () => {
   ratingCardSection.classList.remove('ratings-submitted');
   userRating = 0;
   ratings.forEach((rating, index) => {
       ratingLabels[index].classList.remove('active');
       rating.checked = false;
   });
    errorMessage.classList.add('hidden');
})



