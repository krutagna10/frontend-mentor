const markAsReadButton = document.querySelector('.mark-as-read');
const notifications = document.querySelector('.notifications');
const numberOfNotifications = document.querySelector('.number-of-notifications');
const lightModeIcon = document.querySelector('.light-mode-icon');
const darkModeIcon = document.querySelector('.dark-mode-icon');
const body = document.querySelector('body');
const notificationList = document.querySelectorAll('.notification');

// Dark mode toggle
darkModeIcon.addEventListener('click', () => {
  body.classList.add('dark-mode');
})

lightModeIcon.addEventListener('click', () => {
  body.classList.remove('dark-mode')
})


// When the user clicks markAsReadButton
markAsReadButton.addEventListener('click', () => {
  notifications.classList.add('no-unread-message');
  numberOfNotifications.textContent = 0;
  for (let notification of notificationList) {
    notification.classList.remove('unread-background');
  }
})



