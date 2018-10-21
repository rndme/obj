// Enhances Objects like Array, with methods like keys, define, freeze, json, clone, etc
// By dandavis. MIT applies. v1.0.0

class Obj extends Object {
	constructor(base) {
		super(base);
		Object.assign(this, base);
	}

	keys() { // accepts: null  returns: Array of collection property names
		return Object.keys(this);
	}
	values() { // accepts: null  returns: Array of collection property values
		return Object.values(this);
	}
	entries() { // accepts: null  returns: Array of Arrays of collection properties as [value, key] elements
		return Object.entries(this);
	}
	freeze() { // accepts: null  returns: Object collection, sealed from further shallow modification
		return Object.freeze(this);
	}
	define(key, value) { // accepts: String key, any value  returns: Object collection mutated with new key:value pair added
		this[key] = value;
		return this;
	}
	delete(key) { // accepts: String key name  returns: Object mutated subset of collection without key specified
		delete this[key];
		return this;
	}
	clone() { // accepts: null  returns: Object collection shallow-copied from base collection
		return new Obj(this);
	}
	match(key) { // accepts: RegExp or String term to match keys with  returns: Object subset of collection with matching keys
		var o = new Obj({});
		this.keys().forEach(k => {
			if(k.match(key)) o[k] = this[k];
		}, this);
		return o;
	}
	filter(fn) { // accepts: Function chooser  returns: Object subset of collection for which chooser returns true
		var o = new Obj({});
		this.keys().forEach(k => {
			if(fn.call(this, this[k], k, this)) o[k] = this[k];
		}, this);
		return o;
	}
	reject(fn) { // accepts: Function chooser   returns: Object subset of collection for which chooser returns false
		var o = new Obj({});
		this.keys().forEach(k => {
			if(!fn.call(this, this[k], k, this)) o[k] = this[k];
		}, this);
		return o;
	}
	map(fn) { // accepts: Function chooser   returns: Object with values transformed by chooser return value
		var o = new Obj({});
		this.keys().forEach(k => {
			o[k] = fn.call(this, this[k], k, this);
		}, this);
		return o;
	}
	some(fn) { // accepts: Function chooser  returns: true if chooser returns true for at least one value in collection
		return this.keys().some(k => fn.call(this, this[k], k, this), this);
	}
	every(fn) { // accepts: Function chooser  returns: true if chooser returns true for every value in collection 
		return this.keys().every(k => fn.call(this, this[k], k, this), this);
	}
	find(fn) { // accepts: Function chooser  returns: String keys of matching value, or undefined
		return this.keys().find(k => fn.call(this, this[k], k, this), this);
	}
	findIndex(fn) { // accepts: Function chooser  returns: String keys of matching value, or undefined
		var r = this.keys(),
			i = r.findIndex(k => fn.call(this, this[k], k, this), this);
		return r[i];
	}
	sort(fn) { // accepts: optional Function callback  returns: Object collection with sorted keys
		var o = new Obj({});
		this.keys().sort(fn).forEach(k => {
			o[k] = this[k];
		}, this);
		return o;
	}
	reverse() { // accepts: null  returns: Object with keys in reverse order from collection
		var o = new Obj({});
		this.keys().reverse().forEach(k => {
			o[k] = this[k];
		}, this);
		return o;
	}
	pluck(keys) { // accepts: Array of String keys names or many String key names   returns: Object subset of collection with only named keys
		var o = new Obj({}),
			r = Array.isArray(keys) ? keys : [...arguments];
		r.forEach(k => {
			o[k] = this[k];
		}, this);
		return o;
	}
	slice(start, stop) { // accepts: null, optional String start key, optional String stop key   returns: Object subset of collection with in-range keys
		var o = new Obj({}),
			r = this.keys();
		if(arguments.length == 0) start = "!";
		if(arguments.length < 2) stop = "~";
		r.forEach(k => {
			if(k >= start && k <= stop) o[k] = this[k];
		}, this);
		return o;
	}
	random() { // accepts: null  returns: Object with a single key:value part from collection
		var r = this.keys(),
			i = Math.floor(Math.random() * r.length);
		return new Obj({
			[r[i]]: this[r[i]]
		});
	}
	get(key) { // accepts: String key  returns: any value of collection's key property; same o.get("a")==a.a==a['a']
		return this[key];
	}
	set(key, value) { // accepts: String key, any value   returns: Object, the collection
		this[key] = value;
		return this;
	}
	extend(o) { // accepts: Object to merge into base  returns: Object, the collection, with additional properties from o
		Object.assign(this, o);
		return this;
	}
	json(fmt) { // accepts: Boolean formatted response flag   returns: String representation of object
		return JSON.stringify.call(JSON, this, null, fmt ? "\t" : null);
	}

} //end Obj()
