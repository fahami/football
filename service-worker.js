const CACHE_NAME = "footmatch-v1";
var urlsToCache = [
    "/",
    "index.html",
    "nav.html",
    "team.html",
    "css/materialize.min.css",
    "js/materialize.min.js",
    "js/idb.js",
    "js/db.js",
    "js/nav.js",
    "js/api.js",
    "manifest.json",
    "images/icons/icon-512x512.png",
    "images/icons/icon-384x384.png",
    "images/icons/icon-192x192.png",
    "images/icons/icon-152x152.png",
    "images/icons/icon-144x144.png",
    "images/icons/icon-128x128.png",
    "images/icons/icon-96x96.png",
    "images/icons/icon-72x72.png",
    "images/maskable_icon.png",
    "pages/home.html",
    "pages/teams.html",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
        })
    )
})


self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log(cacheName);
                    if (cacheName != CACHE_NAME) {
                        console.log(`Service Worker : Cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener("fetch", event => {
    var base_url = "https://api.football-data.org/v2/";
    var base_url_logo = "https://crests.football-data.org/";
    if (event.request.url.indexOf(base_url) || event.request.url.indexOf(base_url_logo) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return fetch(event.request).then((response) => {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request,{ignoreSearch:true}).then((response) => {
				return response || fetch(event.request);
			})
		)
	}
})

self.addEventListener('push', e => {
    var body;
    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/maskable_icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});