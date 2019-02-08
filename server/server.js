const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');

// console.log(__dirname+'/../public');
console.log(publicPath);

const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');

	// socket.emit('newEmail',{
	// 	from : 'mike@example.com',
	// 	text : 'hello there!',
	// 	createdAt: 123
	// });

	// socket.on('createEmail',(email)=>{
	// 	console.log('createEmail',email);
	// });

	socket.emit('newMessage',{
		to: 'Julian',
		text: 'There you go',
		createdAt: 123123
	});

	socket.on('createMessage',(msg)=>{
		console.log('Create Message',msg);
	});

	socket.on('disconnect',()=>{
		console.log('User was disconnected');
	})
});

server.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
});