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

wss.on('connection', (ws) => {
  ws.name = 'Anonymous';
  ws.color = '#66ccff';
  console.log(`Client connected: ${wss.clients.size} active`);
  wss.broadcast(JSON.stringify({ id: uuid(), type: 'connectionUpdate', userCount: wss.clients.size, content: `${ws.name} connected`  }));

  ws.on('message', (messageJSON) => {
    const message = JSON.parse(messageJSON);
    message.id = uuid();
    message.type = responseTypes[message.type];
    ws.name = message.nameUpdate || ws.name;
    ws.color = message.colorUpdate || ws.color;
    message.userColor = ws.color;
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${wss.clients.size} active`);
    wss.broadcast(JSON.stringify({ id: uuid(), type: 'connectionUpdate', userCount: wss.clients.size, content: `${ws.name} disconnected` }));
  });
});