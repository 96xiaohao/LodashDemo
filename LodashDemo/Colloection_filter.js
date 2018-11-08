const _ = require('lodash')

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false },
    { 'user': 'zhuzhu', 'age': 36, 'active': true },
    { 'user': 'huahua',   'age': 40, 'active': false }
];
/**
 * 功能： 过滤出users集合中active属性为false的所有元素，并组成新的集合返回
 * 返回结果：[ { user: 'fred', age: 40, active: false },
            { user: 'huahua', age: 40, active: false } ]
 */
const new_colleciton = _.filter(users,user=>{ return !user.active});
console.log(new_colleciton);


/**
 * 功能：可以根据集合中对象的部分属性来进行精准过滤
 * 返回结果：[ { user: 'barney', age: 36, active: true },
 *          { user: 'zhuzhu', age: 36, active: true } ]
 */
const new_colleciton2 = _.filter(users,{'age': 36, 'active':true});
console.log(new_colleciton2);

/**
 * 功能：也可以以生省略函数的方饭进行过滤，这样更简便,过滤出集和中的所有对象中，active 属性为false的对象并组成新的集合返回
 * 返回结果 ： [ { user: 'fred', age: 40, active: false },
 *            { user: 'huahua', age: 40, active: false } ]
 */
const new_collection3 = _.filter(users,['active', false]);
console.log(new_collection3);

/**
 * 功能 ： 过滤出集合的所有对象中，active 属性为false的对象并组成新的集合返回
 * 返回结果 ：[ { user: 'barney', age: 36, active: true },
 *            { user: 'zhuzhu', age: 36, active: true } ]
 */
const new_collection4 = _.filter(users,'active');
console.log(new_collection4);