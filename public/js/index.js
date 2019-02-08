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

socket.on('newLocationMessage',function(msg){
	console.log('New Message:',msg);
	var li=jQuery('<li></li>');
	var a=jQuery('<a target="_blank">My Current Location</a>');
	li.text(`${msg.from} :`);
	a.attr('href',msg.url);
	li.append(a);
	jQuery('#messages').append(li);
});
// socket.emit('createMessage',{
// 	from:'Jason',
// 	text:'Hello'
// },function(data){
// 	console.log('I Gotcha.',data);
// });

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit',function(e){
	e.preventDefault(); // to override the default behaviour of the form (passing form field data in the URL)

	socket.emit('createMessage',{
		from : 'User',
		text : messageTextbox.val()
	},function(){
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation is not supported by your browser');
	}
	locationButton.attr('disabled','disabled').text('Sending Location...');
	navigator.geolocation.getCurrentPosition(function(position){
		// console.log(position);
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		})
	},function(){
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location');
	});
})