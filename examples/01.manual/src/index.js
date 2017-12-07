import './assets/css/mystyle.css'

if ('serviceWorker' in navigator) {  
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log("OK")
  })
}