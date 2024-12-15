import {ws} from '../websockets.js';
import Devicemotion from './devicemotion.js';
let inMotion = new Devicemotion();
if ('geolocation' in navigator) {
	console.log('geolocation ok!');
} else {
	alert('Geolocation is not supported by this browser.');
}

class GPS {
	#latitude = null;
	#longitude = null;
	constructor() {
		console.log('GPS class instance');
	}
	
	getPosition(navigator) {
		navigator.geolocation.watchPosition(
		(position) => {
			const {latitude, longitude} = position.coords;
			console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
			if (devicemotion.getAlarmState()) {
			
			}
			
			// Send location data to the socket
			let data = [latitude, longitude];
			// worker.postMessage({latitude, longitude});
			// console.log('Sending location data:', data);
			// ws.send(data);
		},
		(error) => {
			console.error(`Error: ${error.message}`);
		},
		{
			maximumAge: 5000
			, enableHighAccuracy: true
		}
	);
}
}
