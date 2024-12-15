import express from 'express';
import path from 'path';
import {WebSocketServer} from 'ws';
import {createServer} from 'http';

const app = express();
const port = process.env.PORT ?? 3000;

// Create an HTTP server using the Express app
const server = createServer(app);

// Serve static files from the 'public' folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Import routers or other middleware if necessary
app.use('/', (req, res) => {
	res.status(200).sendFile(path.join(process.cwd(), 'public', 'index.html'));
});
// app.get('/client', (req, res) => {
// 	res.status(200).sendFile(path.join(process.cwd(), 'public', 'client.html'));
// });

// 404 Not Found route
app.use((req, res) => {
	res.status(404).sendFile(path.join(process.cwd(), 'views', 'notFound.html'));
});

// Error-handling middleware (must be at the end)
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const msg = 'Internal Server Error';
	console.error(err.stack);
	res.status(status).json({
		success: false,
		message: msg
	});
});

// Initialize the WebSocket server
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
	console.log('New client connected');
	
	// Handle incoming messages from the client
	ws.on('message', (message) => {
		console.log(`Received: ${message}`);
		// Broadcast to all connected clients
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(`${message}`);
			}
		});
	});
	
	// Handle client disconnection
	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

// Start the server
server.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
