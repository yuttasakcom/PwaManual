importScripts('workbox-sw.prod.v1.0.1.js');

const fileManifest = [
  {
    "url": "/bundle.js",
    "revision": "5c0451422e3250701c434c77eff787e2"
  },
  {
    "url": "/index.html",
    "revision": "c88717833bbda62cf64fe7965e7a790f"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
