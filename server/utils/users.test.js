const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
	var U;

	beforeEach(()=>{
		U=new Users();
		U.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		},{
			id: '2',
			name: 'Andrew',
			room: 'React Course'
		},{
			id: '3',
			name: 'John',
			room: 'Node Course'
		}]
	}); // gets call before every single test case

	it ('should add new user',()=>{
		var U = new Users();
		var user = {
			id:'123',
			name:'Andrew',
			room:'Random'
		};
		var result = U.addUser(user.id,user.name,user.room);
		expect(U.users).toEqual([user]);
	});

	it('should remove a user',()=>{
		var user=U.removeUser('2');
		expect(user.id).toBe('2');
		expect(U.users.length).toBe(2);
	});

	it('should not remove a user',()=>{
		var user=U.removeUser('4');
		expect(user).toNotExist();
		expect(U.users.length).toBe(3);
	});

	it('should find user',()=>{
		var user = U.getUser('2');
		expect(user.id).toBe('2');
	});

	it('should not find user',()=>{
		var user = U.getUser('5');
		expect(user).toNotExist();
	});

	it('should return names of users having node course',()=>{
		var userList = U.getUserList('Node Course');
		expect(userList).toEqual(['Mike','John']);
	});
});