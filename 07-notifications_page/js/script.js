'use strict'

const readButton = document.querySelector('.notifications__read-btn');
const notifications = document.querySelectorAll('.notification.notification--unchecked');
const unreadIcons = document.querySelectorAll('.notification__unread-icon');
const notificationsNumberElement = document.querySelector('.notifications__number');
const btnThemeToggle = document.querySelector('.notifications__btn-theme');

const body = document.querySelector('body');

// When the user clicks markAsReadButton
readButton.addEventListener('click', () => {
  notificationsNumberElement.style.display = 'none';
  notifications.forEach((notification, index) => {
      notification.classList.remove('notification--unchecked');
      unreadIcons[index].style.display = 'none';
  });
})


// When the user clicks unread notification
let numberOfNotifications = 3;
notifications.forEach((notification, index) => {
    notification.addEventListener('click', () => {
        notification.classList.remove('notification--unchecked');
        unreadIcons[index].style.display = 'none';

        numberOfNotifications = numberOfNotifications - 1;
        if (numberOfNotifications > 0) {
            notificationsNumberElement.textContent = numberOfNotifications;
        } else  {
            notificationsNumberElement.style.display = 'none';
        }
  })
})

// Dark mode toggle
btnThemeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
})


