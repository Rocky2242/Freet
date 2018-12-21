// Add a connect listener
io.on('connection', function(socket) {
  console.log('Client connected.')
  socket.on('updateSrc', function(data) {
    socket.broadcast.emit('updateSrc', data)
  })

  // Disconnect listener
  socket.on('disconnect', function() {
    console.log('Client disconnected.');
  })
})
