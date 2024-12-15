const element = document.getElementById('fullscreen');
const lockScreen = document.getElementById('fullscreen-btn');
let wakeLock = null;

// Request fullscreen and wake lock
async function enableFullscreenAndWakeLock() {
	try {
		// Request fullscreen
		if (element.requestFullscreen) {
			await element.requestFullscreen();
		}
		
		// Request wake lock
		if ('wakeLock' in navigator) {
			wakeLock = await navigator.wakeLock.request('screen');
			console.log('Wake lock activated');
		} else {
			console.log('Wake Lock API not supported');
		}
	} catch (err) {
		console.error(`Error: ${err.message}`);
	}
}

// Release wake lock on fullscreen exit
document.addEventListener('fullscreenchange', async () => {
	if (!document.fullscreenElement && wakeLock) {
		await wakeLock.release();
		wakeLock = null;
		console.log('Wake lock released');
	}
});

element.addEventListener('click', enableFullscreenAndWakeLock);
