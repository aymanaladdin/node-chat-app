const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const {generateMsg} = require("./utils/message");

const root = path.join(__dirname, "../public");
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log(`new user connected`);

    socket.emit("newMessage", generateMsg("Admin", "Welcome to the chat group :)")); 

    socket.broadcast.emit("newMessage", generateMsg("Admin", "New User has joined the chat group"));

    socket.on('createMessage', (data)=>{
        //broadcasing incoming message to everyone that is connected
        io.emit('newMessage', generateMsg(data.from, data.text));
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
});

// app.use((req, res, next)=>{
//     console.log(req.method, req.url);
//     next();
// });

app.use(express.static(root));

server.listen(port, ()=> console.log(`app is running on port ${port}`));

