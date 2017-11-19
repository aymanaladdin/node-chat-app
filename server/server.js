const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const root = path.join(__dirname, "../public");
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log(`new user connected`);

    //emit event for new messages
    socket.emit('newMessage', {from: "ahmed@exg.co", text: "انت فين يا بأف", createdAt: "12452"});

    socket.on('createMessage', (data)=>{
        console.log('New Message Created:', data)
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

