/**
 * 在node.js 中就是根据事件轮寻来实现回调函数实现异步编程
 *下来看一个典型异步例子
 */

var fs = require('fs');

fs.open(
    'info.txt','r',
    function (err, handle) {
        var buf = new Buffer(100000);
        fs.read(
            handle,buf,0,10000,null,
            function (err,length) {
                console.log(buf.toString('utf-8',0,length));
                fs.close(handle,function () {});
            }
        )
    }
);


/**
 * 异步函数的回调和同步函数有区别
 * 用try....catch是无法完全捕捉
 * 到回调函数的错误的
 *
 * node中回调会有自己的一套错误处理
 */

// do_something(param1,param2,....param3,function (err,results) {
//
// })

/*
参数err的值一般会是
1.null 表示操作成功，并且会有一个返回值(如果有需要的话)
 */

//异步代码错误处理的两种风格
//(一)

//此种方式不常用，会忘记return 从而导致bug
fs.open(
    'info.txt','r',
    function (err,handle) {
        if (err){
            console.log(`ERROR: ${err.code}(${err.message})`);
            return;
        }
    }
);

//异步错误处理（二）此种方式会使代码更加健壮
fs.open(
    'info.txt','r',
    function (err,handle) {
        if (err){
            console.log(`ERROR: ${err.code}(${err.message})`);
        }else {
            //sucess! continue working here
        }
    }
);


/*
编写一个类来处理一些普通的文件操作
 */
var fs = require('fs');
function FileObject() {
    this.filename = '';

    this.file_exists = function (callback) {
        var self = this;
        console.log("About to open:"+ self.filename)
        fs.open(self.filename,'r',function (err,handle) {
            if (err){
                console.log("Can t open:" + self.filename);
                callback(err);
                return;
            }

            fs.close(handle,function () { });
            callback(null,true);

        });

    };
}

//在下述代码中使用该类：
var fo = new FileObject();
fo.filename = 'not_exitFile';
fo.file_exists(function (err,results) {
    if (err) {
        console.log("Aw,bummer:" + JSON.stringify(err));
        return;
    }
    console.log("file exists!!!")
});



/**
 * 异步的另一个坑的解决办法，学会放弃控制权
 *
 */

//一个函数计算两个数组的交叉元素，

function compute_intersection(arr1,arr2,callback) {
    var results = [];
    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){
            if(arr2[j] == arr1[i]){
                results[results.length] = arr1[i]
                break;
            }
        }
    }
    callback(null,results);
}

//可以利用全局兑现process中的nextTick方法，这种方法就好像
//在跟系统说"我放弃执行控制权，你可以在你空闲的时候执行我给你"
//ti供的函数，相较于setTime函数，这种方式会显著提高执行速度

function compute_intersection(arr1,arr2,callback) {
    var bigger = arr1.length > arr2.length ? arr1 : arr2
    var smaller = bigger == arr1 ? arr2 : arr1;
    var bigLen = bigger.length;
    var smlLen = bigger.length;

    var sidx = 0;      //起始下标
    var size = 10;      //分成小块的规模
    var results = [];

    function sub_compute_intersection() {
        for (var i = sidx; i < (sidx + size) && i<bigLen; i++){
            for (var j=0; j<smlLen; j++){
                if (bigger[i] == smaller[j]) {
                    results.push(smaller[j]);
                    break;
                }
            }

        }

        if (i >= bigLen){
            callback(null,results);
        } else{
            sidx += size;
            process.nextTick(sub_compute_intersection());
        }
    }
    sub_compute_intersection();
}

/*
在上面这个新版的函数中，只需简单地将较大的输入数组分割成10
(可以是任意大小的数据块)，分别计算交叉元 素，然后调用
process#nextTick函数，从而允许Node处理其他事件 或者
请求。只有当该任务的队列前面没有事件时，才会继续执行该任
务。别忘记将回调函数sub_compute_intersection传递给
 process#nextTick，这样才能保证当前作用域能被作为闭包
 保存下 来。通过这种方式，我们就能将中间结果保存到
 compute_intersection函数中的变量中了。
 */




/**
 *node中一些核心api的同步版本 例如在文件操作中
 *
 */

var fs2 = require('fs');
var handle = fs.openSync('info.txt','r');
var buf = new Buffer(100000);
var read = fs.readSync(handle,buf,0,10000,null);
console.log(buf.toString('utf8',0,read));
fs.closeSync(handle);