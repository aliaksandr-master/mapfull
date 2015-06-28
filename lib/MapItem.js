'use strict';

var _ = require('lodash');
var Class = require('bb-class').Class;

/*var MapItem = */module.exports = Class.extend({

	_data: null,

	_name: null,

	initialize: function (name, props) {
		this._data = {};

		var that = this;

		if (_.isEmpty(name) || !_.isString(name)) {
			throw new Error('map item name must be specified and must be a string');
		}

		this._name = name;

		_.each(props, function (v, k) {
			that.set(k, v);
		});
	},

	getName: function () {
		return this._name;
	},

	getData: function () {
		return _.extend({}, this._data);
	},

	clone: function (freeze) {
		var obj = new this.constructor(this.getName());

		obj._data = _.cloneDeep(this._data);

		if (freeze) {
			obj.freeze(true);
		}

		return obj;
	},

	isFreezed: function () {
		return this._freeze;
	},

	unfreeze: function () {
		if (this._freezeForever) {
			return;
		}

		delete this._freeze;
	},

	freeze: function (forever) {
		if (forever) {
			this._freezeForever = true;
		}

		this._freeze = true;
	},

	set: function (fieldName, value) {
		if (this._freeze) {
			return;
		}

		if (this._data.hasOwnProperty(fieldName)) {
			if (_.isEqual(this._data[fieldName], value)) {
				return;
			}
		}

		this._data[fieldName] = value;
	},

	get: function (fieldName, def) {
		if (!arguments.length) {
			return _.cloneDeep(this._data);
		}

		return this._data.hasOwnProperty(fieldName) ? _.cloneDeep(this._data[fieldName]) : def;
	},

	test: function (args, strict) {
		var that = this;

		if (_.isFunction(args)) {
			return Boolean(args(_.cloneDeep(this._data)));
		}

		if (!strict) {
			return _.all(args, function (v, k) {
				var specificMethodForFieldTesting = that['test_' + k];

				if (_.isFunction(specificMethodForFieldTesting)) {
					return specificMethodForFieldTesting(v);
				}

				return _.isEqual(that._data[k], v);
			});
		}

		return _.isEqual(args, this._data);
	}
});
