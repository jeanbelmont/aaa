import {ws} from './websockets.js';
console.log('navigator', ws);


let watchId;
if ('geolocation' in navigator) {
	watchId = navigator.geolocation.watchPosition(
		(position) => {
			const {latitude, longitude} = position.coords;
			console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
			
			// Send location data to the socket
			let data = [latitude, longitude];
			// worker.postMessage({latitude, longitude});
			console.log('Sending location data:', data);
			ws.send(data);
		},
		(error) => {
			console.error(`Error: ${error.message}`);
		},
		{
			maximumAge: 5000
			// enableHighAccuracy: true
		}
	);
} else {
	alert('Geolocation is not supported by this browser.');
}
