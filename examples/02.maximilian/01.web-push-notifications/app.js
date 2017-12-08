import './app.css'

if (!window.Promise) {
  window.Promise = Promise
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('Service worker registered!'))
    .catch(err => console.log(err))
}

const enableNotificationsButtons = document.querySelectorAll(
  '.enable-notifications'
)

const displayConfirmNotification = () => {
  if ('serviceWorker' in navigator) {
    const options = {
      body: 'You successfully subscribed to our Notification service!'
    }
    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification('Successfully subscribed (from SW)!', options)
    })
  }
}

const askForNotificationPermission = () => {
  Notification.requestPermission(function(result) {
    console.log('User Choice', result)
    if (result !== 'granted') {
      console.log('No notification permission granted!')
    } else {
      displayConfirmNotification()
    }
  })
}

if ('Notification' in window) {
  for (let i = 0; i < enableNotificationsButtons.length; i++) {
    enableNotificationsButtons[i].style.display = 'inline-block'
    enableNotificationsButtons[i].addEventListener(
      'click',
      askForNotificationPermission
    )
  }
}
