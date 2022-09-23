let ratings = document.querySelectorAll('.rating');
let submitButton = document.querySelector('.submit-button');

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
   console.log(`You have selected ${userRating} stars`);
})



