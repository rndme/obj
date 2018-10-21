// Enhances Objects like Array, with methods like keys, define, freeze, json, clone, etc
// By dandavis. MIT applies. v1.0.0

class Obj extends Object {
  constructor(base){
    super(base);
    Object.assign(this, base);
  }

  keys(){return Object.keys(this);}
  values(){return Object.values(this);}
  entries(){return Object.entries(this);}
  freeze(){return Object.freeze(this);}
  define(key, value){this[key]=value; return this;}
  delete(key){delete this[key]; return this;}
  clone(){return new Obj(this);}
  match(key){
    var o=new Obj({});
    this.keys().forEach(k=>{if(k.match(key))o[k]=this[k];}, this);
    return o;
  }
  filter(fn){
    var o=new Obj({});
    this.keys().forEach(k=>{if(fn.call(this,this[k],k,this)) o[k]=this[k];}, this);
    return o;
  }
  reject(fn){
    var o=new Obj({});
    this.keys().forEach(k=>{if(!fn.call(this,this[k],k,this)) o[k]=this[k];}, this);
    return o;
  }
  map(fn){
    var o=new Obj({});
    this.keys().forEach(k=>{o[k]=fn.call(this,this[k],k,this);}, this);
    return o;
  }
  some(fn){
    return this.keys().some(k=>fn.call(this, this[k], k, this), this);
  }
  every(fn){
    return this.keys().every(k=>fn.call(this, this[k], k, this), this);
  }
  find(fn){
     return this.keys().find(k=>fn.call(this,this[k],k,this), this);
  }
  findIndex(fn){
     var r=this.keys(), i=r.findIndex(k=>fn.call(this,this[k],k,this), this);
     return r[i];
  }
  sort(fn){
    var o=new Obj({});
    this.keys().sort(fn).forEach(k=>{o[k]=this[k];}, this);
    return o;
  }
  reverse(){
    var o=new Obj({});
    this.keys().reverse().forEach(k=>{o[k]=this[k];}, this);
    return o;
  }
  pluck(keys){
    var o=new Obj({}), r=Array.isArray(keys) ? keys : [...arguments];
    r.forEach(k=>{o[k]=this[k];}, this);
    return o;
  }
  slice(start, stop){
    var o=new Obj({}), r=this.keys();
    if(arguments.length==0) start="!";
    if(arguments.length<2) stop="~";
    r.forEach(k=>{if(k>start && k<stop) o[k]=this[k];}, this);
    return o;
  }
  random(){
    var r = this.keys(), i=Math.floor(Math.random()*r.length);
    return new Obj({[r[i]]:this[r[i]]});
  }
  get(key){ return this[key]; }
  set(key, value){ this[key]=value; return this;}
  extend(o){Object.assign(this, o);return this;}
  json(fmt){return JSON.stringify.call(JSON, this, null, fmt ? "\t": null);}

}//end Obj()
