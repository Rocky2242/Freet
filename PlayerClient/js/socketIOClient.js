const socket = io.connect('http://localhost:3000', {reconnect: true, transports: ['websocket']})

socket.on('updateSrc', (msg) => {
    console.log(msg)
})
