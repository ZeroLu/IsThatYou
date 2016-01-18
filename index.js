
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3 = require('d3');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

app.get('/central', function(req, res){
    res.sendFile(__dirname + '/central.html');
});
app.get('/parent', function(req, res){
    res.sendFile(__dirname + '/parent.html');
});
app.get('/kid', function(req, res){
    res.sendFile(__dirname + '/kid.html');
});
app.get('/old', function(req, res){
    res.sendFile(__dirname + '/old.html');
});
app.get('/mapFinal', function(req, res){
    res.sendFile(__dirname + '/mapFinal.html');
});


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});