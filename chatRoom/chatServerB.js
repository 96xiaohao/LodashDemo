const net = require('net');

let clients = {}; //保存{用户名：socket}的映射

//发言，将聊天内容发送给其他几个人

function broadCast(nickname,chunk) {
    Object.keys(clients).forEach(key => {
        //自己的聊天内容不应该发送给自己
        if(key != nickname){
            clients[key].write(`${nickname}:${chunk}\r\n`)
        }
    })
}

let server = net.createServer(function (socket) {

    server.maxConnections = 3; //服务器最大连接数是3

    //当客户端连接服务时，提示用户输入用户名
    server.getconnections((err,count)=>{
        socket.write(`欢迎来到聊天室 当前用户数为${count}个，请输入用户名:\r\n`)
    });

    let nickname;
    socket.setEncoding('utf8');

    //当用户关闭了一个聊天，销毁socket,并删除用户

    socket.on('end',function () {
        clients[nickname] && clients[nickname].destroy();
        delete clients[nickname]
    });

    socket.on('data',function (chunk) {
        chunk = chunk.replace(/\r\n/,'')
        //如果是nickname存在，说明用户输入的是聊天内容
        if (nickname) {
            broadCast(nickname,chunk)
        }else {
            //如果不存在nickname时，用户输入的内容就是nickname
            nickname = chunk
            clients[nickname] = socket
            socket.write(`您的新用户名是${nickname}\r\n`);
        }

    });

});

server.listen(8080);