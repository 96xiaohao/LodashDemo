/*
核心类型：
    number(数字)
    boolean(布尔值)
    string（字符串）
    object (对象)
复杂类型：
    object (对象)
    function(函数)
    array(数组)
特殊类型：
    null  表示没有值
    undefined 表示还没有赋值或者不存在


 */

//可以通过typeof 操作符来查看任何数据的类型
var a = 10
var fun = function(a,b){var c = a + b};
console.log(typeof a);
console.log(typeof fun);

/*
在某个数被0整除这点上，javaScript和其他语言有很大的
不同，它会简单的返回一个正无穷大(Infinity)或者负无穷
大（-Infinity）而不会抛出一个异常
 */

var x = 10
var z = -5
var y = 0

console.log(x/y)
console.log(z/y)

/*
可以用parseInt和parseFloat函数将字符串转化为数字
 */
var number1 = "4094040.3434"
console.log(parseInt(number1))
console.log(parseFloat(number1))

/*
如果这些函数无法解析传入的参数，那么将会返回一个特殊的值
NaN(not-a-number)
 */
var err_nunber = "cadkdkk"
console.log(parseInt(err_nunber))


/*
为了测试一个值是否为数字，可以使用isNaN函数
 */
var n1 = 48409
var s2 = 'ioge9ke90'
console.log(isNaN(n1))
console.log(isNaN(s2))

/*
为了测试一个给定的值是否是一个合法的有限数
不是Infintiy,-Infinity，或者NaN）我们
需要使用isFinite()函数
 */
var num2 = 10/0  //无穷大的数 Infinity
console.log(isFinite(num2)) //false


/*
boolean类型，在js中，可以通过boolean函数将其他值转为
布尔值，但是没必要这样，js会自动转
(1)false,0,空字符串(""),NaN,null 以及 undefinedd都
等价于false
 */


/*
在js中单引号和双引号在功能 上是等价的，可以选择任意一个使用。
如果想要在使用单引号的字符 串中包含单引号，可以使用\';同理，
如果在使用双引号的字符串中 包含双引号，可以使用\"
 */
console.log('I love you \'my baby');
console.log("I love you \"my dear");

/*
要想获得一个js字符串的长度，只需使用length属性
 */
var cc = "eijoiewooj434949";
console.log(cc.length);


/*
在js中如果获取值为null或者undefined的字符串长度时会抛出错误
 */

var anull = null
var undef
//console.log(anull.length);//抛出异常
//console.log(undef.length);  //抛出异常

/*
关于js的自动类型转换
尤其他字符混入字符串中，js会尽可能将其转化为字符串，这是类型的自动转换
 */

var data = 5 + 3 + "is my favourite number";
var data2 = "" + 5 + 3 + "is my favourite nunver";
console.log(data);
console.log(data2);

/*
字符串函数，index()函数可以从在一个字符中搜索另一个字符串
 */

var ss = "I love you";
var s = 'love';
var s_index = ss.indexOf(s); //返回目标字符串在母字符串中的起始位置
console.log(s_index);

/*
从一个子串中截取一个字符串，substr()函数 或者splice函数
substr()接受一个开始索引和一个需要截取字符串的长度
splice()接受一个开始索引和一个结束索引
 */

var sss = "I love you";
var s1 = sss.substr(2,4); //从2号位置开始截取，截取四个字符 love
console.log(s1);
var s3 = sss.substr(2,5); //从2位置截取到5号位置
console.log(s3);

/*
如果字符串中有某个分割符，可以用split函数将字符串分割成子字符串，并返回
一个数组
 */

var bigStr = "a|g|j|h|h|g|g|g|d|d";
console.log(bigStr.split("|"));


/*
与index函数类似，search函数接受一个正则表达式参数，并返回第一个匹配此正则表达
式的位置索引，如果匹配不存在，返回-1
 */

console.log("aaoo".search(/[Aa]{2,}/));
console.log("aoo".search(/[Aa]{2,}/));



//object类型

/*
对象是js的语言核心之一，相当灵活和动态的数据类型
一下是最常用的创建对象的方法
 */
var o1 = new Object();

var o2 = {}


/*
以下是第二种创建对象的方法，又叫对象字面量法，在初始化的时候，
指定对象的成员名字和对应值
 */

var user = {
    frist_name: 'xiaohao',
    ageg : '23',
    citizenship : "man of the world"
}


/*
关于json
注意：在json中强制使用引号，json中的所有字符串都要包含在双引号中

在v8引擎中，可以使用JSON.parse和JSON.stringify函数来生成json数据
JSON.parse()接受一个字符串作为参数，生成json数据
JSON.stringify()接受一个对象作为参数，并返回一个JSON字符串表示

对象添加属性的两种方式
user.hair_colour = "brow"
user["hair_colour"] = "brown"
 */


/**
 * js中的数组(array)类型其实是JavaScript对象的一个特殊形式，有两种定义方法
 *
 * 1: var arr1 = new array()  不常用
 * 2: var arr2 = []           常用
 *
 *
 * 通过Array.isArray()方法可以判定一个对象是否一是一个数组
 *
 */

var arr3 = ['cat','rat','bat'];
console.log(Array.isArray(arr3));


/*
在数组末尾添加元素的两种方法
1.  arr3.push("mat")
2.  arr3[arr3.length] = "fat"

 */


/*
delete关键字从数组中删除元素，删除元素后，但是元素的位置还存在
若想真正删除元素，则用splice()函数
 */

/*
删除数组中的元素用splice()函数，该函数接收删除项的起始索引，
和数目作为参数，返回被删除的数组项，元素组被修改
 */
var arr4 = ['a','b','c','d'];
var delete_str = arr4.splice(0,1);    //删除第一个元素
console.log(delete_str);
console.log(arr4);


/*
数组中的常用函数如push,pop函数可以让我们向数组末尾添加或者删除元素

如果想在数组的头部插入或者删除元素，可以分别使用unshift和shift函

sort（） 对数组进行排序

也可以自己提供排序函数，然后传给sort（）函数
 */

arr = ['Jonn','Maria','Moonbean','jerry','marc'];
arrSort = arr.sort(function (a,b) {
    var a1 = a.toLowerCase(),b1 = b.toLowerCase();
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return 0;
});

console.log(arrSort);


/*
遍历数组的两种方式
1.for循环
2.forEach循环
 */

arrStr = ['Jonn','Maria','Moonbean','jerry','marc'];

//for循环
for (let i = 0; i < arrStr.length; i++){
    console.log(arrStr[i]);
}
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

arrStr.forEach(((value) => {
    console.log(value)
}));
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
arrStr.forEach(function (value) {
    console.log(value);

});


/**
 * js 中的类型比较和转换
 * js中有两种类型相等：
 * 1.相等运算符 == (判断两个操作数有没有相同的值)
 * 2.严格相等 === （判断两个操作数有没有相同的值以及是否为相同的数据类型）
 */

console.log(124 == '124');  //true
console.log(234 === '234'); //false
console.log("cat" == "CAT"); //false
console.log("cat".toUpperCase() == "CAT");  //true

/*
关于很多值都等价于false,事实上他们完全不同
 */
console.log('' == false == null == undefined == 0);  //ture

console.log(null == undefined);  //false

/*
注意不要使用对象构造器来替代原始类型，这样比较类型时候会很奇怪
 */
var x = 234;
var x1 = new Number(234);
console.log(typeof(x)); //number
console.log(typeof(x1)); // objiect
console.log(x == x1);   // true
console.log(x === x1);  // false

/*
js函数不同于其他语言函数的部分
1.当函数被调用时如果传入的参数不够，剩下的变量会被赋予undefind值，
而如果传入的函数过多，则多余的参数会被简单地做无用处理，所有函数在
函数体中都会有一叫做arguments的预定义数组，她拥有调用时所入的实参
我们可以对参数列表做额外的检查，实际上可以更进一步使用这个数组，从而
让数组更加强大灵活
 */


/**
 * js的语言结构：
 * 1.绝大部分逻辑操作符
 * 2.算数操作符
 * 3.三元运算符
 *
 *
 * 另外js除了标准的while，do....while 和 for循环，js还支持
 * 新的for循环扩展，for...in 循环（v8Js），用这种循环可以获取
 * 所有对象的属性名
 */

var user = {
    name : '小浩',
    age : '23',
    tall : '178.cm'
}

for(key in user){
    console.log(key);
}


/**
 * js中的类，原型和继承
 *
 * js中没有名确的类（class关键字或者类型，事实上，javaScript中所有的类
 * 都是以函数的形式定义的
 */

//接下来看无法继承的形式

// 非原形继承类
function Shape1() {
    this.X = 0;
    this.Y = 0;
    
    //方法1
    this.move = function (x,y) {
        this.X = x;
        this.Y = y;
    }

    //方法2
    this.distance_from_origin = function () {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }
}

//实例化一个对象
var s = new Shape1();
s.move(10,10);
console.log(s.distance_from_origin());

/*
我们还可以在任何时候添加任意的属性和方法到类中
var s = new Shape(15,35);
s.FillColour = "red";

声明类的函数同样也是这个类的构造函数！

注意：这种创建类的方法有问题
    1.效率低
    2.每个对象都必须自己实现类型方法，
    （每创建一个新的Shape实例，都必须要创建move和
    distance_from_origin函数）其次我们可能需要继承
    这个类和属性来创建原形和方形，并让新的类继承基类的方法
    和属性而不必做任何额外的工作
 */


/*
可以用js的原型机制来继承类属性和方法，默认情况下就是对象都只有
一个原型（prototype）对象
 */
function Shape() {

}
    Shape.prototype.X = 0;
    Shape.prototype.Y = 0;

    //方法1
    Shape.prototype.move = function (x,y) {
        this.X = x;
        this.Y = y;
    }

    //方法2
    Shape.prototype.distance_from_origin = function () {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }

    Shape.prototype.area = function () {
        throw new Error("I don't have a form yet");
    }

 //如果添加一个area方法，则所有的shape实例都会拥有这个方法
//而在基类中这种方法确行不通，它会抛出错误

/*
我们可以利用原型，对类进行扩展
 */

function Square() {

}

Square.prototype = new Shape();
Square.prototype.__proto__  = Shape.prototype;
Square.prototype.Width = 0;
Square.prototype.area = function () {
    return this.Width * this.Width;
};

var sq = new Square();
sq.move(-5,-5);
sq.Width = 5;
console.log(sq.area());
console.log(sq.distance_from_origin());

//在上面代码中使用了在v8和其他实现中出现的新js特性
//__proto__属性,他告诉js声明的心类的基本原型应该
//是指定的类型，因此也就可以从指定的类进行扩展


//我们还可以进一步扩展

function Rectangle() {

}

Rectangle.prototype = new Square();
Rectangle.prototype.__proto__ = Square.prototype;
Rectangle.prototype.Height = 0;

Rectangle.prototype.area = function () {
    return this.width * this.Height;
}

var re = new Rectangle();
re.move(25,25);
re.Width = 10;
re.Height = 5;
console.log(re.area());
console.log(re.distance_from_origin());


//对象sq是 类Square的实例
console.log(sq instanceof Square); //ture
//对象sq是类 Shape的实例
console.log(sq instanceof Shape);  //ture
//对象sq 不是类Rectangle的实例
console.log(sq instanceof Rectangle);  //false
//对象re是类Rectangle的实例
console.log(re instanceof Rectangle);  //ture
//对象re是类Square的实例
console.log(re instanceof Square);    // ture
//对象re是类Shape的实例
console.log(re instanceof Shape);    //ture
//对象sq 不是类Date的实例
console.log(sq instanceof Date);     //false


/**
 * js中的错误和异常
 * 在js中通常使用Error对象和一条信息来表示一个错误
 * 当遇到情况时可以抛出错误
 */

function uhoh() {
    throw new Error("Something bad happened")
}

//uhoh();

/*
js也可以通过象其他语言一样用try/catch语句块来捕捉错误：
 */
function uhoh2() {
    throw new Error("Something bad happened")
}

try{
    uhoh()
}catch (e) {
    console.log("I caught an error:" + e.message);
}
//捕获到异常程序不会死掉
console.log("program is still running");


/**
 * Node.js 有几个关键的全局对象
 * 1.global对象，任何附加到该对象上的东西
 * 在node的应用中的任何地方都是可见的
 */
function printit(var_name) {
    console.log(global[var_name]);
}

global.fish = "swordfish";
global.pet = "cat";

printit("fish");
printit("pet");
printit("fruit"); ///???????????有问题


/*
console对象
在经常使用的console.log函数中node.js有一个全局变量console
不仅如此，他还有一些有趣的函数
1.warm(msg) --- 与log类似的函数，但是打印的是标准错误
2.time(label)和timeEnd（label）第一个函数被调用时会表标示一个
时间戳，而当第二个函数被调用时，会打印出从time函数被调用
后经过的时间
3.assert(cond,message) 如果cond等价于false,则抛出
一个AssertionFailure异常
 */


/**
 * process对象
 * process对象,它包含许多信息和方法，常用方法有
 * 1.exit() 是终止Node.js程序的方式之一
 * 2.env() 返回一个对象，它包含了当前用户的环境变量
 * 3.cwd() 返回程序当前的工作目录
 */


