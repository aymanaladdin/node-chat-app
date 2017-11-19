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
