const _ = require('lodash');

var users = [
    { 'user': '小猪🐖',  'active': false },
    { 'user': '小马🐎',    'active': false },
    { 'user': '小牛🐂', 'active': true }
];

/*
功能：寻找用户集合中user是小猪的元素
返回：{ user: '小猪🐖', active: false }
 */
const index1 = _.find(users,(u)=>{ return u.user == '小猪🐖'});
console.log(index1);


/*
功能：查询小马这个元素
返回：{ user: '小马🐎', active: false }
 */
const index2 = _.find(users, { 'user': '小马🐎',    'active': false });
console.log(index2);

/*
功能：查询集合中属性active为false的第一个元素
返回：{ user: '小猪🐖', active: false }
 */
const index3 = _.find(users,['active',false]);
console.log(index3);

/*
功能：查询集合中元素的active属性为true的第一个元素
返回：{ user: '小牛🐂', active: true }
 */
const index4 = _.find(users,'active');
console.log(index4);
