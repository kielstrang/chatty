// server.js

const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid/v1');

const PORT = 3001;

const responseTypes = {
  postMessage: 'incomingMessage',
  postNotification: 'incomingNotification'
};

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (messageJSON) => {
    console.log('message');
    const message = JSON.parse(messageJSON);
    message.id = uuid();
    console.log('Incoming type:', message.type);
    message.type = responseTypes[message.type];
    console.log('response type:', message.type);
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => console.log('Client disconnected'));
});