const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');

// console.log(__dirname+'/../public');
console.log(publicPath);

const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');

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

	// socket.emit('newMessage',{
	// 	to: 'Julian',
	// 	text: 'There you go',
	// 	createdAt: 123123
	// });

	// socket.emit from Admin text Welcome to the chat app
	// socket.emit('newMessage',{
	// 	from: 'Admin',
	// 	text: 'Welcome to the chat app',
	// 	createdAt: new Date().getTime()
	// });
	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));

	// socket.broadcast.emit from Admin text New user joined
	// socket.broadcast.emit('newMessage',{
	// 	from: 'Admin',
	// 	text: 'New user joined',
	// 	createdAt: new Date().getTime()
	// });
	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined.'));

	socket.on('createMessage',(msg,callback)=>{
		console.log('Create Message',msg);
		callback('This is from server.');
		// io.emit('newMessage',{
		// 	from: msg.from,
		// 	text: msg.text,
		// 	createdAt: new Date().getTime()
		// });
		io.emit('newMessage',generateMessage(msg.from,msg.text));
		// socket.broadcast.emit('newMessage',{
		// 	from: msg.from,
		// 	text: msg.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});

	socket.on('disconnect',()=>{
		console.log('User was disconnected');
	});
});

server.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
});