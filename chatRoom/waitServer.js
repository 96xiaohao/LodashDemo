const net = require('net');

const server = net.createServer(function (socket) {

    socket.pause();
    socket.setTime(5000);
    //接受客户端的数据并打印
    socket.on('data',function (chunk) {

        socket.pause() //暂停触发data时间
        console.log(chunk)
    })

    socket.on('timeout',function () {
        socket.end();
    });
});

server.listen(8080);