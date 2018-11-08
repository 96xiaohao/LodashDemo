var http = require("http");  //node的内建模块之一

function process_request(req,res) {
    var body = "Thanks for calling! \n";
    var content_length = body.length;

    //定制响应头
    res.writeHead(200,{
        'Content-Length' : content_length, //响应内容的长度
        'Content-Type' : 'text/plain'      //响应内容的类型
    });

    res.end(body);

}

//createServer函数只会接受一个函数参数，它会在用户连接到服务器时被调用
var server = http.createServer(process_request);
server.listen(8080); //node.js 会默认将服务器的HTTP的连接设置为keep-alive


/*
node.js内置了一个调试器。如果想使用只需要在启动的时候讲debug参数添加到程序名称的前面即可
Node调试器中有一些关键的命令可供使用:
■ cont——继续执行。
■ next——跳到下一个语句。
■ step——进入当前执行函数中的语句(如果是函数的话;否 则，跳过)。
■ out——跳出当前执行函数。
■ backtrace——显示当前调用执行帧或调用栈。
■ repl——启动Node REPL，允许查看变量值和执行代码。
■ watch(expr)——向观察列表中添加表达式，这样在调试器 中进入函数或者移动时会显示出来。
■ list(n)——列出调试器中当前停止行的前面和后面的n行代 码。


第三方的基于浏览器的编译器有 node-inspector
 */