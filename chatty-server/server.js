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
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let userCount = 0;

wss.on('connection', (ws) => {
  userCount += 1;
  console.log(`Client connected: ${userCount} active`);
  wss.broadcast(JSON.stringify({ id: uuid(), type: 'connectionUpdate', userCount }));

  ws.on('message', (messageJSON) => {
    const message = JSON.parse(messageJSON);
    message.id = uuid();
    message.type = responseTypes[message.type];
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => {
    userCount -= 1;
    console.log(`Client disconnected: ${userCount} active`);
    wss.broadcast(JSON.stringify({ id: uuid(), type: 'connectionUpdate', userCount }));
  });
});