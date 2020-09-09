const express = require('express')
const app = express()
const server = require('http').Server(app)
const moment = require('moment');
const io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    socket.username = "Anonymous";
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
        socket.time = moment().format('h:mm a')
    });

    socket.on('new_message',(data)=>{
        io.sockets.emit('new_message',{time: socket.time,message:data.message, username: socket.username});
    })
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});

server.listen(8080)