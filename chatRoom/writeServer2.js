const net = require('net');
const path = require('path');

//获得可写操作的流对象
const ws = require('fs').createWriteStream(path.join(__dirname,'./1.txt'));

//创建服务
const server = net.createServer(function (socket) {
    socket.pipe(ws,{false});  //多个socket共用一个ws,设置这个可写流不关闭，// 其他未关闭的客户端仍可以写
    setIimeout(function () {
        ws.end();  //关闭可写流
        socket.unpipe(ws)  //取消管道

    },5000)
});
server.listen(8080);
