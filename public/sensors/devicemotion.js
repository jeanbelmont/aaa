class Devicemotion {
	#fireAlarm = false;
	#startTime = null;
	#isTracking = false;
	// Throttle the `checkMotion` function to execute at most once every 100ms
	#throttleTimeout = null;
	
	constructor() {
		// console.log('Devicemotion constructor');
		this.checkMotion = this.checkMotion.bind(this); // Bind the context
		window.addEventListener('devicemotion', this.checkMotion);
	}
	
	checkMotion(event) {
		if (this.#throttleTimeout) return;
		this.#throttleTimeout = setTimeout(() => {
			this.#throttleTimeout = null;
			
			const {x, y, z} = event.acceleration;
			const threshold = 0.01; // Small threshold to account for sensor noise
			
			if (Math.abs(x) < threshold && Math.abs(y) < threshold && Math.abs(z) < threshold) {
				// No motion detected
				if (this.#isTracking) {
					this.#startTime = null;
					this.#isTracking = false;
				}
				return;
			}
			
			// Motion detected
			if (!this.#isTracking) {
				this.#startTime = Date.now();
				this.#isTracking = true;
			}
			
			const currentTime = Date.now();
			// console.log(`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, Z: ${z.toFixed(2)} m/s²`);
			// console.log(`Motion Duration: ${currentTime - this.#startTime} ms`);
			
			if (currentTime - this.#startTime > 5000) {
				console.log('Start tracking');
				this.#fireAlarm = true;
				this.resetMotionTracking();
			}
		}, 100);
	}
	
	resetMotionTracking() {
		this.#startTime = null;
		this.#isTracking = false;
		window.removeEventListener('devicemotion', this.checkMotion);
		
		setTimeout(() => {
			window.addEventListener('devicemotion', this.checkMotion);
			this.#fireAlarm = false;
		}, 6000);
	}
	
	getAlarmState(){
		return this.#fireAlarm;
	}

}
// let devmotion = new Devicemotion();
// export default devmotion;
export default Devicemotion;

