const url = 'wss://jjco.dev';
const local = 'ws://localhost:3000';
const ws = new WebSocket(url);

// const messageInput = document.getElementById('messageInput');
// const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('coords-view');

// Connection opened
ws.addEventListener('open', () => {
	messagesDiv.innerHTML = '<strong>Connected to server</strong>';
	ws.send(JSON.stringify({type: 'register', name: 'location'}));
	console.log('Connected to WebSocket server');
});

// Listen for messages
let counter = 0;

ws.addEventListener('message', (event) => {
	let coords = event.data;
	console.log('COORDS:', coords);
	messagesDiv.innerHTML = `${coords} ${counter}`;
	counter++;
});

// Handle send button click
// sendButton.addEventListener('click', () => {
// 	const message = messageInput.value;
// 	if (message) {
// 		ws.send(message);
// 		messagesDiv.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
// 		messageInput.value = '';
// 	}
// });

// Handle connection close
ws.addEventListener('close', () => {
	console.log('Disconnected from WebSocket server');
	messagesDiv.innerHTML = '<strong>Disconnected from server</strong>';
});

// Handle errors
ws.addEventListener('error', (error) => {
	console.error('WebSocket error:', error);
	messagesDiv.innerHTML += `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
});

export {ws};
