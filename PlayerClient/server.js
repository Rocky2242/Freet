const { exec } = require('child_process');
const express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

global.io = require('socket.io')(httpServer);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});
httpServer.listen(3000, () => {
  console.log('listening');
});

require('./socketIOServer.js');
