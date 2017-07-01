importScripts('https://unpkg.com/workbox-sw@1.0.1');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    url: '/index.html',
    revision: 'bb121c',
  }, {
    url: '/bundle.js',
    revision: 'acd123',
  }
]);