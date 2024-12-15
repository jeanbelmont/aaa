self.addEventListener('install', event => {
	console.log('[SW] Installed');
	
	event.waitUntil(caches.open('svg')
	.then(kch => {
		console.log('[SW] kch', kch);
		kch.addAll([
			'/',
			'/index.html',
			'/favicon5.svg',
			'/src/css/app.css',
			'/src/css/feed.css',
			'/src/js/app.js',
			'/src/js/feed.js',
			'/src/js/material.min.js',
		])
	}));
});

self.addEventListener('activate', event => {
	console.log('[SW] activated');
	self.skipWaiting();
	return self.clients.claim();
	
});


self.addEventListener('fetch', event => {
	// console.log('Fetching [service worker...]', event);
	// event.respondWith(fetch(event.request));
	caches.match(event.request).then(cache => {
		return cache;
	})
	.catch(err => {
		console.log(err);})
})
