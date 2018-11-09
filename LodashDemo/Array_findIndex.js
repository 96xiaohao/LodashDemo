const _ = require('lodash');

var users = [
    { 'user': '小猪🐖',  'active': false },
    { 'user': '小马🐎',    'active': false },
    { 'user': '小牛🐂', 'active': true }
];

/*
功能：寻找用户集合中user是小猪的元素在集合中的下标
返回：0
 */
const index1 = _.findIndex(users,(u)=>{ return u.user == '小猪🐖'});
console.log(index1);


/*
功能：查询小马这个元素在集合中的下标
返回：
 */
const index2 = _.findIndex(users, { 'user': '小马🐎',    'active': false });
console.log(index2);

/*
功能：查询集合中和条件匹配的第一个元素的下标
返回：0
 */
const index3 = _.findIndex(users,['active',false]);
console.log(index3);

/*
功能：查询集合中元素的active属性为true的第一个元素的下标
返回：2
 */
const index4 = _.findIndex(users,'active');
console.log(index4);
