module.exports = (socket, io) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Add your custom events here
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        socket.emit('chat message', `Server received your message: ${msg}`); // Broadcast message to all connected clients
    });

    // Add more event handlers as needed
};
