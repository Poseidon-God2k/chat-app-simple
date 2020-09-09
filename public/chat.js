$(function(){
    var socket = io.connect('http://localhost:8080')
    //buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    
    send_message.click(function(){
        socket.emit('new_message',{message: message.val()})
    })
    
    //listen on new_message
    socket.on('new_message',(data)=>{
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ":" +"<span style='color:black'>"+data.message +"</span>" +"</br>"+data.time+"</p>");
    })

    //Emit a username
	send_username.click(function(){
        socket.emit('change_username', {username : username.val()})
        document.getElementById("send_username").disabled = true;
	})

})