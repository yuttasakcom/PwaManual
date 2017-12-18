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
      body: 'You successfully subscribed to our Notification service!',
      icon: '/img/icons/app-icon-96x96.png',
      image: '/img/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100, 50, 200],
      badge: '/img/icons/app-icon-96x96.png',
      tag: 'confirm-notification',
      renotify: true,
      actions: [
        {
          action: 'confirm',
          title: 'Okay',
          icon: '/img/icons/app-icon-96x96.png'
        },
        {
          action: 'cancel',
          title: 'Cancel',
          icon: '/img/icons/app-icon-96x96.png'
        }
      ]
    }
    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification('Successfully subscribed!', options)
    })
  }
}

const configurePushSub = () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  let reg

  navigator.serviceWorker.ready
    .then(swreg => {
      reg = swreg
      return swreg.pushManager.getSubscription()
    })
    .then(sub => {
      if (sub === null) {
        let vapidPublicKey =
          'BLFoheuwClsZevo-WB1smwPHZVdrToKlOTfOFUutxKvKxuqxhyWk23LcFrzdyhp9_nvoV12tmNut9Y54-DlUC-U'
        let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        })
      } else {
      }
    })
    .then(newSub => {
      console.log(newSub)
      return fetch(
        'https://elite-vault-181110.firebaseio.com/subscriptions.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(newSub)
        }
      )
    })
    .then(res => {
      if (res.ok) {
        displayConfirmNotification()
      }
    })
    .catch(err => {
      console.log(err)
    })
}

const askForNotificationPermission = () => {
  Notification.requestPermission(function(result) {
    console.log('User Choice', result)
    if (result !== 'granted') {
      console.log('No notification permission granted!')
    } else {
      configurePushSub()
      //   displayConfirmNotification()
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

const urlBase64ToUint8Array = base64String => {
  var padding = '='.repeat((4 - base64String.length % 4) % 4)
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
