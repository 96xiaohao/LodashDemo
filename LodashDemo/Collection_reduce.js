const _ = require('lodash');

/*
功能：reduce可以接收三个参数，第一个是参数是要被操作的集合，第二个参数是累加函数，第三个参数用于定义累加操作的初始值（可选）
被传递到reduce的累加函数也有三个参数第一个参数用于保存前一次累加的结果，第二个参数用于保存value（被操作的集合是一维数组
若被操作的集合是一个键值对类型的对象，那么累加函数会有第三个函数key

返回：3 因为reduce没有传递初始值，所以累加函数从被操作集合的第一个元素1（初始值）开始累加
 */
const a = _.reduce([1, 2], function (sum, n) {
    return sum + n;
});
console.log(a);


/*
功能： 从10开始累加 [1,2]
返回： 13
 */
const b = _.reduce([1, 2], (sum, n)=>{
    return sum + n;
},10);
console.log(b);


/*
功能：reduce其实就是一个累加器，它可以接收三个参数（被操作的集合，累加函数，累加的初始值）
累加函数用于定义要累加的操作他也有三个参数（函数的第一个参数，用于保存上一次累加的结果（上一次没结果的话就是初始值），第二个参数用于
保存value，第三个参数用于保存下标）
返回：{ '1': [ 'a', 'c' ], '2': [ 'b' ] }
 */
const c = _.reduce({'a':1, 'b':2, 'c':1},function (result,value,key) {
    (result[value] || (result[value] = [])).push(key);
    return result;
},{});
console.log(c);


