'use strict';

var Mapper = require('./_lib').Mapper;
var MapItem = require('./_lib').MapItem;

exports['common usage'] = function (test) {

	var mapper;

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', {}),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		var answ = mapper.match({}, { strict: true });

		test.deepEqual(answ, [ { _data: {}, _name: '1' }, { _data: {}, _name: '2' }, { _data: {}, _name: '3' } ]);
	});

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', { a: 3 }),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		var answ = mapper.match({}, { strict: true });

		test.deepEqual(answ, [ { _data: {}, _name: '2' }, { _data: {}, _name: '3' } ]);
	});

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', { a: 3 }),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		var answ = mapper.match({});

		test.deepEqual(answ, [ { _data: { a: 3 }, _name: '1' }, { _data: {}, _name: '2' }, { _data: {}, _name: '3' } ]);
	});

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', { a: 3 }),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		var answ = mapper.match({});

		test.deepEqual(answ, [ { _data: { a: 3 }, _name: '1' }, { _data: {}, _name: '2' }, { _data: {}, _name: '3' } ]);
	});

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', { a: 3 }),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		var answ = mapper.match({ a: 3 });

		test.deepEqual(answ, [{ _data: { a: 3 }, _name: '1' }]);
	});

	test.doesNotThrow(function () {
		mapper = new Mapper([
			new MapItem('1', { a: 3 }),
			new MapItem('2', {}),
			new MapItem('3', {})
		]);

		test.ok(mapper.hasItem('1'));

		test.deepEqual(mapper.getItem('1'), { _data: { a: 3 }, _name: '1' });
	});

	test.done();
};
