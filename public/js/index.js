
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

    socket.on('newLocationMeg', function(data){
        console.log('New Message: ', data);
        
        var li = jQuery("<li></li>");
        var a = jQuery("<a target='_blank'>My Current Location</a>");
        
        li.text(`${data.from}: `);
        a.attr('href', data.url);

        li.append(a);
        $("#message-list").append(li);
        
    });

    
    socket.on('disconnect', function(){
        console.log('disconnected from the server');

    });
    

    $("#message-form").on('submit', function(event){
        var messageTextbox = $("[name=msg]");
        
        event.preventDefault();
        
        socket.emit("createMessage", { from: "User", text: messageTextbox.val() }, function(){
            //reset textbox when event callback acknowkledge reach from the server
            messageTextbox.val("");
        });
    });


    var locationBtn = jQuery("#send-location");

    locationBtn.on('click', function(){

        if(!navigator.geolocation){
            alet("Navigator Geolocation is not supported on your Browser :( ");
        }
        else{
            locationBtn.attr("disabled", "disabled");

            navigator.geolocation.getCurrentPosition(function(position){
                locationBtn.removeAttr('disabled');
                socket.emit("createLocationMsg", { lat: position.coords.latitude, long: position.coords.longitude });
            }, function(){
                locationBtn.removeAttr('disabled');
                alert("Unable to get loaction!!");
            });
        }
    });
});