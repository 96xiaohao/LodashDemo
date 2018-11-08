const net = require('net');
const server = net.createServer();
const clients = {};  //用于保存客户端的连接
var  client = null; //当前的客户端连接
var uid = 0;

server.on('connection',(socket) =>{

    //启动心跳机制
    var isOnline = !0;
    var keepAliveTimer = socket.timer = setInterval(()=>{
        //判断如果有空闲连接，则获得一个客户端连接
        if (!isOnline){
            client = socket;
            quit(socket.nick);
            return;
        }

        if (socket.writable){
            isOnline = !1;
            socket.write('::')
        } else {
            client = socket;
            quit(socket.nick)
        }
    },3000);

    //结束时会被触发
    socket.on('end',()=>{
        console.log('client disconnected .\n\r ');
        socket.destroy();   //销毁套接字
    });

    //发生错误时会被触发
    socket.on('error',(error)=>{
        console.log(error.message)
    })


    //接收到数据会被触发
    socket.on('data',(chunk)=>{
        client = socket;
        var msg = JSON.parse(chunk.toString());

        if (msg.cmd == 'keep'){
            isOnline = !0;  //标示为真；
            return;
        }
        dealMsg(msg);
    });
});


//服务器监听错误
server.on('error',(err)=>{
    console.log(err)
});

//服务器持续监听
server.on('listening',()=>{
    console.log(`listening on ${server.address().address}:${server.address().port}\r\n`)
});

server.listen(8086);   //启动监听

//以下是一些处理方法

/**
 * 处理用户信息
 */
function dealMsg(msg) {
    const cmd = msg.cmd;
    const funs= {
        'login' : login,
        'chat' : chat,
        'quit' : quit,
        'exit' : exit,
    };

    if (typeof funs[cmd] !== 'function') return !1;
    funs[cmd](msg);
}

/**
 * 释放连接
 * @param conn 连接对象
 */
function freeConn(conn) {
    conn.end();
    delete clients[conn.uuid];
    conn.timer && clearInterval(conn.timer);
}

/**
 * 用户首次进入聊天室
 */
function login(msg) {
    var uuid = '';
    uuid = getRndStr(15)+(++uid); //产生用户Id

    client.write(`欢迎你，${msg.nick}: 这里总共有${Object.keys(clients).length} 个小伙伴在聊天~\r\n`)
    client.nick = msg.nick;
    client.uuid = msg.uuid;

    clients[uuid] = clients;   //建立用户和客户端的映射

    broadcast(`系统：${msg.nick}进入了聊天室`);
}

/**
 * 广播消息
 */
function broadcast(msg) {
    Object.keys(clients).forEach((uuid)=>{
        //判断是不是自己说的话如果是自己说的话就不广播给自己
        if ((clients[uuid] != clients) && clients[uuid].writable){
            clients[uuid].write(msg);
        }
    })

}

/**
 * 退出聊天室
 * @param nick 用户昵称
 */
function quit(nick) {
    var message = `小伙伴${nick}退出了聊天室~`;
    broadcast(message);
    freeConn(client);
}

function chat(msg) {
    //判断用户输入的命令是不是要退出
    if (msg.msg.toLowerCase() == 'quit' || msg.msg.toLocaleString() == 'exit'){
        quit(msg.nick);
        return ;
    }
}

/**
 * 随机获取指定长度的字符串
 */
function getRndStr(len=1) {
    var rndStr = '';

    for (; rndStr.length < len; rndStr += Math.random().toString(36).substr(2)) ;
    return rndStr.substr(0,len)

}








