const _ = require('lodash');

/**
 * 定义方法用于计算一个数的平方
 * @param n
 * @returns {number}
 */
function square(n) {
    return n * n;
}

/*
功能：迭代数组中的每个元素，给元素求平方
返回：[ 16, 64 ]
 */
const new_array = _.map([4,8], square);
console.log(new_array);

/*
功能：迭代对象中的每个元素，给元素求平方并返回 结果组成的数组
返回：[ 16, 64 ]
 */
const new_array2 = _.map({'a' : 4, 'b' : 8}, square);
console.log(new_array2);


/*
功能： 迭代集合中的每个对象，并按照对象的属性key 得到value，并将获得的所有value 以数组的形式返回
返回：[ '小猪🐖', '小猪🐷' ]
 */
var users = [
    {'user' : '小猪🐖'},
    {'user' : '小猪🐷'}
];

const new_array3 = _.map(users, 'user');
console.log(new_array3);
