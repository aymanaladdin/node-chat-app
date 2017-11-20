const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

const {generateMsg, generateLocationMsg} = require("./utils/message");
const {isValidString} = require("./utils/valodators");
const {Users} = require("./utils/users");

const root = path.join(__dirname, "../public");
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', (socket)=>{
    console.log(`new user connected`);

    socket.on('join', (params, callback)=>{
        if(!isValidString(params.name) || !isValidString(params.chat)){
            callback("User name and Chat room required");
        }
        //make the user join the room
        socket.join(params.chat);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.chat);

        io.to(params.chat).emit("updatePeopleList", users.getUserList(params.chat));
        socket.emit("newMessage", generateMsg("Admin", "Welcome to the chat group :)")); 
        socket.broadcast.to(params.chat).emit("newMessage", generateMsg("Admin", `${params.name} has joined the chat group`));

        callback();
    })

    socket.on('createMessage', (data, callback)=>{
        //broadcasing incoming message to everyone that is connected
        io.emit('newMessage', generateMsg(data.from, data.text));
        console.log("Recieved Msg", data);
        callback();
    });

    socket.on("createLocationMsg", (position)=>{
        io.emit('newLocationMeg', generateLocationMsg("User", position.lat, position.long));
    });

    socket.on('disconnect', ()=>{
        const user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit("updatePeopleList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMsg("Admin", `${user.name} has left the chat group`));
            console.log('user disconnected');            
        }
    });
});

app.use(express.static(root));

server.listen(port, ()=> console.log(`app is running on port ${port}`, users.userList));

