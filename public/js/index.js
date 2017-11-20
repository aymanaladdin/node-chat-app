
// socket.emit('createMessage', { from: "browser", text: "waiting for acknowledgement" }, function(data){
//  console.log(data);
// });

$( function(){

    function scrollToBottom () {
        // Selectors
        var messages = jQuery('#message-list');
        var newMessage = messages.children('li:last-child')
        // Heights
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();
      
        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
          messages.scrollTop(scrollHeight);
        }
      }

    var socket = io();
    socket.on('connect', function(){
        console.log("connect to the server");
    });
    
    socket.on('newMessage', function(data){ 
        console.log('New Message: ', data);
        
        var formattedTime = moment(data.createdAt).format("h:mm a");
        //get the inner html inside template script
        var template = jQuery("#msg-template").html();
        //generat rendered list item --msg
        var li = Mustache.render(template, {from: data.from, text: data.text , createdAt: formattedTime});
        //append our list with it
        jQuery("#message-list").append(li);
        scrollToBottom();   
    });

    socket.on('newLocationMeg', function(data){
        console.log('New Message: ', data);
        
        var formattedTime = moment(data.createdAt).format("h:mm a");

        var template = jQuery("#locationMsg-template").html();
        var li = Mustache.render(template, {from: data.from, url: data.url, createdAt: formattedTime});
        
        $("#message-list").append(li);
        scrollToBottom();
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