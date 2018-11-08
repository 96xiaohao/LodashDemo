const _ = require('lodash');

/*
功能：该方法只能做读操作，不能做写操作，且不会返回新的集合，如果强行返回则返回原集合
返回： [ 1, 2 ]
 */
const a = _.forEach([1,2], function (value) {
    return value+1;
});
console.log(a);


/*
功能：该方法只能做读操作，不能做写操作，且不会返回新的集合，如果强行返回则返回原集合
无返回只有在控制台输出: a,b
 */

_.forEach({'a' : 1, 'b' : 2},(value,key)=>{
    console.log(key)
});


/*
功能：该方法只能做读操作，不能做写操作，且不会返回新的集合，如果强行返回则返回原集合
无返回只有在控制台输出:  barney,fred,zhuzhu,huahua
 */
var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false },
    { 'user': 'zhuzhu', 'age': 36, 'active': true },
    { 'user': 'huahua',   'age': 40, 'active': false }
];

_.forEach(users,(value)=> {
    console.log(value.user)
})