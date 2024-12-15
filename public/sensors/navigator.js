import {ws} from '../websockets.js';
import Devicemotion	from './devicemotion.js';

let devicemotion = new Devicemotion();
// console.log('navigator', ws);




let isWatching = false;
let lat = null;
let long = null;
let distance = null;
let startTime = null
let currentTime = null;
if ('geolocation' in navigator) {
	navigator.geolocation.watchPosition(
		(position) => {
			const {latitude, longitude} = position.coords;
			// console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
			
			if (!isWatching) {
				lat = latitude;
				long = longitude;
			}
			
			if (devicemotion.getAlarmState()) {
				isWatching = true;
				startTime = Date.now();
			}
			
			if (isWatching){
				currentTime = Date.now();
				distance = haversineDistance(lat, long, latitude, longitude);
				console.log('distance '+distance.toFixed(1));
				
				if (distance.toFixed(2) > 4) {
					console.log('HELP')
					let data = [longitude, latitude];
					ws.send(JSON.stringify(data));
				}
				if (
					(distance.toFixed(2) < 4) && (currentTime - startTime > 10000)
				){
					isWatching = false;
					console.log('Stop Watching!!!');
				}
			}
			//
			// Send location data to the socket
			
			// worker.postMessage({latitude, longitude});
			// console.log('Sending location data:', data);
			
		},
		(error) => {
			console.error(`Error: ${error.message}`);
		},
		{
			maximumAge: 5000
			,enableHighAccuracy: true
		}
	);
} else {
	alert('Geolocation is not supported by this browser.');
}


function haversineDistance(lat1, lon1, lat2, lon2) {
	const R = 6371000; // Earth's radius in meters
	
	// Convert degrees to radians
	const rad = (angle) => (angle * Math.PI) / 180;
	
	const dLat = rad(lat2 - lat1);
	const dLon = rad(lon2 - lon1);
	
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	return R * c; // Distance in meters
}

// Example usage
// let lat1 = 19.4323989;
// let lon1 = -98.8992559; // Berlin
// let lat2 = 19.4323989;
// let lon2 = -98.8992559;  // Paris
//
// const distance = haversineDistance(lat1, lon1, lat2, lon2);
// console.log(`Distance: ${distance.toFixed(2)} meters`);
