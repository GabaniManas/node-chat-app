const expect = require('expect');

const {isRealString} = require('./validation');

// isRealString
	// should reject non-string values
	// should reject string with only spaces
	// should allow string with non-space chracters

describe('isRealString',()=>{
	it('should reject non-string values',()=>{
		var res=isRealString(98);
		expect(res).toBe(false);
	});

	it('should reject string with only spaces',()=>{
		var res=isRealString('      ');
		expect(res).toBe(false);
	});

	it('should allow string with non-space characters',()=>{
		var res=isRealString('  abc  ');
		expect(res).toBe(true);
	}); // it without done is synchronous function and vice versa
});