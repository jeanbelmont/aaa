if (!'serviceWorker' in navigator) {
	console.error('Service worker not supported');
}

navigator.serviceWorker.register('../service-worker.js')
.then(function (reg) {
	console.log('Service worker registered');
});

// let deferredPrompt = null;
// window.addEventListener('beforeinstallprompt', event => {
// 	console.log('beforeinstallprompt EVENT', event);
// 	event.preventDefault();
// 	deferredPrompt = event;
// 	return false;
// })
//
//
