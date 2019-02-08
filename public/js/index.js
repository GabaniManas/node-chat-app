var socket = io(); // as we have loaded the socket.io.js ... it request server to establish a web socket and keep the connection open
socket.on('connect',function(){
	console.log('Connected to server');

	// socket.emit('createEmail',{
	// 	to: 'andrew@example.com',
	// 	text: 'this is my text'
	// });

	// socket.emit('createMessage',{
	// 	from: 'Julian',
	// 	text: 'Hola!!'
	// });
});

socket.on('disconnect',function(){
	console.log('Disconnected from server');
});

// socket.on('newEmail',function(email) {
// 	console.log('New Email',email);
// });

socket.on('newMessage',function(msg){
	console.log('New Message:',msg);
	var li=jQuery('<li></li>');
	li.text(`${msg.from} : ${msg.text}`);
	jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
// 	from:'Jason',
// 	text:'Hello'
// },function(data){
// 	console.log('I Gotcha.',data);
// });

jQuery('#message-form').on('submit',function(e){
	e.preventDefault(); // to override the default behaviour of the form (passing form field data in the URL)

	socket.emit('createMessage',{
		from : 'User',
		text : jQuery('[name=message]').val()
	},function(){

	});
});
