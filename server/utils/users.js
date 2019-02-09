[{
	id :'12452346',
	name:'abc',
	room:'random'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// var users = []

// var addUser =(id,name,room)=>{
// 	users.push({});
// }

class Users {
	constructor(){
		this.users = [];
	}
	addUser(id,name,room){
		var user={id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		// var user = this.users.filter((user) => user.id===id)[0];
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user) => user.id !== id);
		}
		
		// return user that was removed
		return user;
	}
	getUser(id){
		return this.users.filter((user) => user.id===id)[0];
	}
	getUserList(room){
		// ['Mike','Andrew','John']
		var users = this.users.filter((user) => user.room === room); // array of objects having same room
		var namesArray = users.map((user) => user.name); // map returns some property of the object passed
		return namesArray;
	}	
}

// class Person {
// 	// constructor - initializing a class/object ... called by default
// 	constructor(name,age){
// 		// console.log(name,age);
// 		// this refers to the instance
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription(){
// 		// console.log(this.name,this.age);
// 		return `${this.name} is ${this.age} year(s) old.`;
// 	}
// }

// var somePerson = new Person('Andrew',25);
// console.log(somePerson.getUserDescription());
// console.log(somePerson.name,somePerson.age);
module.exports = {Users};