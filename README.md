# obj
Handy Object methods for collections


| Method        | Arguments           | Return Value  |
| ------------- |-------------| -----|
| keys | null | Array of collection property names |
| values | null | Array of collection property values |
| entries | null | Array of Arrays of collection properties as [value, key] elements |
| freeze | null | Object collection, sealed from further shallow modification |
| define | String key, any value | Object collection mutated with new key:value pair added |
| delete | String key name | Object mutated subset of collection without key specified |
| clone | null | Object collection shallow-copied from base collection |
| match | RegExp or String term to match keys with | Object subset of collection with matching keys |
| filter | Function chooser | Object subset of collection for which chooser returns true |
| reject | Function chooser | Object subset of collection for which chooser returns false |
| map | Function chooser | Object with values transformed by chooser return value |
| some | Function chooser | true if chooser returns true for at least one value in collection |
| every | Function chooser | true if chooser returns true for every value in collection |
| find | Function chooser | String keys of matching value, or undefined |
| findIndex | Function chooser | String keys of matching value, or undefined |
| sort | optional Function callback | Object collection with sorted keys |
| reverse | null | Object with keys in reverse order from collection |
| pluck | Array of String keys names or many String key names | Object subset of collection with only named keys |
| slice | null, optional String start key, optional String stop key | Object subset of collection with in-range keys |
| random | null | Object with a single key:value part from collection |
| get | String key | any value of collection's key property; same o.get("a")==a.a==a['a'] |
| set | String key, any value | Object, the collection |
| extend | Object to merge into base | Object, the collection, with additional properties from o |
| json | Boolean formatted response flag | String representation of object |



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
