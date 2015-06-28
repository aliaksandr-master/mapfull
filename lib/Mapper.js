'use strict';

var _ = require('lodash');
var Class = require('bb-class').Class;

/*var Mapper = */module.exports = Class.extend({
	initialize: function (mapItemArray) {
		if (!_.isArray(mapItemArray)) {
			throw new TypeError('map item array must be Array');
		}

		this._items = this._prepareItems(mapItemArray);

		this._itemsByName = this._indexByName(this._items);
	},

	_prepareItems: function (mapItemArray) {
		return _.map(mapItemArray, function (item) {
			return item.clone(true);
		});
	},

	_indexByName: function (mapItemArray) {
		return _.reduce(mapItemArray, function (reduce, item) {
			var name = item.getName();

			if (!reduce.hasOwnProperty(name)) {
				reduce[name] = item;
			}

			return reduce;
		}, {});
	},

	hasItem: function (name) {
		return this._itemsByName.hasOwnProperty(name);
	},

	getItem: function (name) {
		return this.hasItem(name) ? this._itemsByName[name].clone() : null;
	},

	match: function (args, options) {
		options || (options = {});

		return _.reduce(this._items, function (matched, item, index) {
			/** @var {MapItem} item */

			if (options.limit !== matched.length) {
				if (item.test(args, options.strict)) {
					matched.push(item.clone());
				}
			}

			return matched;
		}, []);
	}
});
