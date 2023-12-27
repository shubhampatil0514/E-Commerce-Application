const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.connect('ws://localhost:3001'); 

client.on('connect', (connection) => {
});

client.on('connectFailed', (error) => {
  console.error('WebSocket connection error:', error.toString());
});



