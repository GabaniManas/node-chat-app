const moment = require('moment');

var generateMessage = (from,text)=>{
	return {
		from,
		text,
		createdAt: moment().valueOf() // new Date().getTime()
	};
};

var generateLocationMessage = (from,lat,lon)=>{
	return {
		from,
		url:`https://www.google.com/maps?q=${lat},${lon}`,
		createdAt: moment().valueOf() // new Date().getTime()
	};
};

module.exports = {generateMessage,generateLocationMessage};