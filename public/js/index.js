var socket = io();
socket.on('connect', function(){
    console.log("connect to the server");
    socket.emit('createMessage', {from: "ahmed@exgo.co", text: "انت مالك يا زفت"});

});

socket.on('newMessage', function(data){
    console.log('New Message: ', data);
});

socket.on('disconnect', function(){
    console.log('disconnected from the server');
});
