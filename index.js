const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // This will emit the event to all connected sockets
    });

    socket.on('location', (location) => {
        console.log('location: ' + location);
        io.emit('location', location);
    });
    
    socket.on('disconnect', () => {
        console.log('Se desconecto un tonoto');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});