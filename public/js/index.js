
// socket.emit('createMessage', { from: "browser", text: "waiting for acknowledgement" }, function(data){
//  console.log(data);
// });

$( function(){

    var socket = io();
    socket.on('connect', function(){
        console.log("connect to the server");
    });
    
    socket.on('newMessage', function(data){
        console.log('New Message: ', data);
        var li = jQuery("<li></li>");
        li.text(`${data.from}: ${data.text}`);
        $("#message-list").append(li);
    
    });
    
    socket.on('disconnect', function(){
        console.log('disconnected from the server');

    });
    

    $("#message-form").on('submit', function(event){
        event.preventDefault();
        socket.emit("createMessage", { from: "User", text: $("[name=msg]").val() });
    });
});