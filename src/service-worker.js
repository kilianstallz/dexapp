/* eslint-disable */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
if (connection) {
  function updateConnectionStatus () {
    console.log("Connection type changed from " + type + " to " + connection);
  }
  connection.addEventListener('change', updateConnectionStatus)
}


// install new sw then reload page
self.addEventListener('message', msg => {
  if (msg.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

// precache fonts from google or gstatic
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

// cache images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
