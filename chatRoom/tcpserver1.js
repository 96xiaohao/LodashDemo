let net = require('net');

//创建一个服务
let server = net.createServer(function (socket) {
    //设置最大连接数为2
    server.maxConnections = 2;
    //连接请求到来时，会触发该方法
    server.getConnections(function (err,count) {
        socket.write(`当前最大容纳${server.maxConnections},现在${count}人`)
    });

    socket.setEncoding('utf-8');
    //接受客户端数据
    socket.on('data',function (data) {

        //打印客户端内容
        console.log(data);
        //关闭套接字
        socket.end();
        //关闭服务器
        server.close()
        //关闭服务器，保持活性通信
        server.unref()

    });

    socket.on('end',function () {
        console.log("客户端关闭")

    });

});

let port = 8080

server.listen(port,'127.0.0.1',function () {
    console.log(`server start ${port}`)

});

//close事件只有调用close方法才会触发
server.on('close',function () {
    console.log('服务器端关闭')
});

//当端口被占用了，更改端口号

server.on('error',function (err) {

    //EADDRINUSE   当前端口被占用
    if(err.code === 'EADDRINUSE'){
        server.listen(++port)
    }

});
