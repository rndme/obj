# obj
Handy Object methods for collections


Examples / Docs

Base demo object:

`var o = new Obj({a:1,z:9,b:2,c:4,d:5});`


#### json output:
`o.clone().json(); //== {"a":1,"z":9,"b":2,"c":4,"d":5}`


#### Match keys by RegExp, reverse key order: 
`o.match(/[abc]/).reverse().json(); //== {"c":4,"b":2,"a":1}`

#### Sort Keys w/callback, get keys as array:
`o.sort((a,b)=>a>b?-1:1).keys() ; //== ["z","d","c","b","a"] `

#### every method like [].every:
`o.every(x=>x>8); //== false` (some values are <8)

#### some method like [].some:
`o.some(x=>x>8); //== true` (some values are >8; z=9)

#### findIndex method like [].findIndex: (returns object key instead of array index)
`o.findIndex(x=>x>6); //== "z"`

#### random key:value pair from object:
`o.random() ; //== {z: 9}`varies each time, could be any single pair in object. use .values()[0] or .keys()[0]

#### Pluck properties from object via array of keys:
`o.pluck("abc".split("")); //== {"a":1,"b":2,"c":4}`

#### Slice Object by start/stop key range:
`o.slice("b","n"); //== {"c": 4,"d": 5}`
