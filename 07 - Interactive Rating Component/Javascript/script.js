const ratings = document.querySelectorAll('.rating');
const submitButton = document.querySelector('.submit-button');
const ratingComponent = document.querySelector(".rating-component");
const input = document.querySelector('.input');
const rateAgainButton = document.querySelector('.rate-again');
currentActive = -1;
let userRating = 0;

ratings.forEach((rating, index) => {
   rating.addEventListener('click', () => {
        currentActive = index;
        update();
   })
})

function update() {
   ratings.forEach((rating, index) => {
      if (currentActive == index) {
         rating.classList.add('active');
         userRating = rating.textContent;
      }  else {
         rating.classList.remove('active');
      }
   })
}

submitButton.addEventListener('click', () => {
   ratingComponent.classList.add('ratings-submitted');
   input.textContent = userRating;
})

rateAgainButton.addEventListener('click', () => {
   ratingComponent.classList.remove('ratings-submitted');
})



