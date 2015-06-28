'use strict';
/*eslint no-undefined: 0 */

var MapItem = require('./_lib').MapItem;

exports['check item'] = function (test) {
	var item;

	test.throws(function () {
		item = new MapItem();
	});

	test.doesNotThrow(function () {
		item = new MapItem('hello');

		test.ok(item.test());
		test.ok(item.test(null));
		test.ok(item.test(undefined));
		test.ok(item.test(3));
	});

	test.doesNotThrow(function () {
		test.ok(!item.test({ hello: true }));
	});

	test.doesNotThrow(function () {
		item.set('hello', true);
	});

	test.doesNotThrow(function () {
		test.equal(item.get('hello', true), true);
	});

	test.doesNotThrow(function () {
		test.ok(item.test({ hello: true }));
		test.ok(item.test({ hello: true }, true));
	});

	test.doesNotThrow(function () {
		item.set('world', {});
	});

	test.doesNotThrow(function () {
		test.ok(!item.test({ hello: true }, true));
		test.ok(item.test({ hello: true }));
		test.ok(item.test({ hello: true, world: {} }));
		test.ok(!item.test({ hello: true, world: { a: 3 } }));
		test.ok(!item.test({ hello: true, world: undefined }));
	});

	test.doesNotThrow(function () {
		item.set('param', true);
		item.freeze();
		item.set('param', false);
		test.equal(item.get('param'), true);
		item.unfreeze();
		item.set('param', false);
		test.equal(item.get('param'), false);
	});

	test.doesNotThrow(function () {
		item.set('param', true);
		item.freeze(true);
		item.set('param', false);
		test.equal(item.get('param'), true);
		item.unfreeze();
		item.set('param', false);
		test.equal(item.get('param'), true);
	});

	test.done();
};

exports['item: freeze forever'] = function (test) {
	var item = new MapItem('hello');

	test.doesNotThrow(function () {
		item.set('param', true);
		item.freeze(true);
		test.ok(item.isFreezed());
		item.set('param', false);
		test.equal(item.get('param'), true);
		item.unfreeze();
		test.ok(item.isFreezed());
		item.set('param', false);
		test.equal(item.get('param'), true);
	});

	test.done();
};

exports['item: freeze'] = function (test) {
	var item = new MapItem('hello');

	test.doesNotThrow(function () {
		item.set('param', true);
		item.freeze();
		test.ok(item.isFreezed());
		item.set('param', false);
		test.equal(item.get('param'), true);
		item.unfreeze();
		test.ok(!item.isFreezed());
		item.set('param', false);
		test.equal(item.get('param'), false);
	});

	test.done();
};


exports['item: clone'] = function (test) {
	var item = new MapItem('hello');

	test.doesNotThrow(function () {
		test.deepEqual(item.clone(), item);

		item.freeze();

		test.notDeepEqual(item.clone(), item);

		item.unfreeze();

		test.deepEqual(item.clone(), item);
	});

	test.done();
};



exports['item: get'] = function (test) {
	var a = { a: 3 };
	var item = new MapItem('hello', { hello: true, param: a });

	test.doesNotThrow(function () {
		test.equal(item.getName(), 'hello');

		test.deepEqual(item.getData(), { hello: true, param: { a: 3 } });

		test.deepEqual(item.get('param'), { a: 3 });

		test.notStrictEqual(item.get('param'), a);
	});

	test.done();
};
