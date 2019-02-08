const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		// store res in variable
		// assert from match
		// assert text match
		// assert createAt is number
		var from = 'John';
		var text = 'Some text';
		var message = generateMessage(from,text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});

describe('generateLocationMessage',()=>{
	it('should generate correct location object',()=>{
		// store res in variable
		// assert from match
		// assert text match
		// assert createAt is number
		var from = 'John';
		var lat = 1; var lon = 2;
		var message = generateLocationMessage(from,lat,lon);
		var url ='https://www.google.com/maps?q=1,2';
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,url});
	});
});