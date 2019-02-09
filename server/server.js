const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');

// console.log(__dirname+'/../public');
console.log(publicPath);

const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var U = new Users();
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
	// socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));

	// socket.broadcast.emit from Admin text New user joined
	// socket.broadcast.emit('newMessage',{
	// 	from: 'Admin',
	// 	text: 'New user joined',
	// 	createdAt: new Date().getTime()
	// });
	// socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined.'));

	socket.on('join', (params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and Room_name are required.');
		}

		socket.join(params.room); // joining the room
		// socket.leave - to leave the room
		U.removeUser(socket.id); // remove user from other potential room and join the new room
		U.addUser(socket.id,params.name,params.room);

		// io.emit -> io.to(params.room).emit - chaining for room counterpart
		// socket.broadcast.emit -> socket.broadcast.to(params.room) - to all other than the user itself
		// socket.emit 
		io.to(params.room).emit('updateUserList',U.getUserList(params.room)); 

		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
		callback();
	});

	socket.on('createMessage',(msg,callback)=>{
		// console.log('Create Message',msg);
		var user = U.getUser(socket.id);
		if(user && isRealString(msg.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,msg.text));
		}
		callback();
		// callback('This is from server.');
		// io.emit('newMessage',{
		// 	from: msg.from,
		// 	text: msg.text,
		// 	createdAt: new Date().getTime()
		// });
		
		// socket.broadcast.emit('newMessage',{
		// 	from: msg.from,
		// 	text: msg.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage',(coords)=>{
		var user = U.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
		}
		
	});

	socket.on('disconnect',()=>{
		console.log('User was disconnected');
		var user = U.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',U.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has leaved.`));
		}
	});
});

server.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
});