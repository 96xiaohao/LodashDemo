//app.js 文件

const express = require('express');
const app = express();

//设置静态路径文件夹，会默认找到当前目录下的index.html文件当做访问页面
app.use(express.static(__.dirName));

//WebSocket是依赖HTTP协议进行握手的
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//监听与客户端连接的事件

io.on('connection',socket=>{
    console.log('服务端连接成功')
});

server.listen(4000);

// io.on('connection', socket => {
//     // 监听客户端发过来的消息
//         socket.on('message', msg => {
//         // 服务端发送message事件，把msg消息再发送给客户端
//                 io.emit('message', {
//                         user: '系统',
//                         content: msg,
//                         createAt: new Date().toLocaleString()
//                });
//         });
// });
//
// const SYSTEM = '系统';
// io.on('connection',socket => {
//     //记录用户名，用来记录不是第一次进入，默认是undefined
//     let username;
//     //监听客户端发过来的消息
//     socket.on('message',msg=>{
//         //服务端发送message事件，把msg消息再发送给客户端
//         //如果用户名存在
//         if (username){
//             //就向所有人广播
//             //io.emit方法是向大厅和所有房间内的人广播
//             io.emit('message',{
//                 user : username,
//                 content : msg,
//                 createAt : new Date().toLocaleString()
//             });
//         } else {
//             //如果用户名不存在
//             //如果是第一次进入，就将输入的内容当做用户名
//             username = msg;
//             //向除了自己以外的所有人广播
//             socket.broadcast.emit('message',{
//                 user : SYSTEM,
//                 content: `${username}加入了聊天`,
//                 createAt: new Date().toLocaleString()
//             });
//         }
//
//
//     });
// });


//处理私聊
//用来保存对应的socket，就是记录对方socket的实例
let socketObj = {};
// 设置一些颜色的数组，让每次进入聊天的用户颜色都不一样
let userColor = ['#00a1f4', '#0cc', '#f44336', '#795548', '#e91e63', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#607d8b', '#ff9800', '#ff5722'];

// 乱序排列方法，方便把数组打乱
function shuffle(arr) {
        let len = arr.length, random;
        while (0 !== len) {
        // 右移位运算符向下取整
                random = (Math.random() * len--) >>> 0;
        // 解构赋值实现变量互换
                [arr[len], arr[random]] = [arr[random], arr[len]];
           }
        return arr;
 }


io.on('connection',socket=> {
    let username;
    let color; //用于保存颜色变量
    let rooms = [];

    socket.on('message', msg => {
        if (username) {
            //正则判断消息是否为私聊专属
            let private = msg.match(/@（[^ ]+) (.+)/);

            if (private) {  //私聊消息
                //私聊的用户正则匹配第一个分组
                let toUser = private[1];
                //私聊的内容，正则匹配的第二个分组
                let content = private[2];
                //从socketObj中获取私聊用户的socket
                let toSocket = socketObj[toUser];

                if (toSocket) {
                    //向私聊的用户发消息
                    toSocket.send({
                        user: username,
                        color,
                        content: content,
                        createAt: new Date().toLocaleString()
                    });
                }

            } else { //公聊消息
                io.emit('message', {
                    user: username,
                    color,
                    content: msg,
                    createAt: new Date().toLocaleString()
                })
            }
        } else { //用户名不存在的情况
            //如果用户名不存在
            //如果是第一次进入，就将输入的内容当做用户名
            username = msg;
            //向除了自己以外的所有人广播
            color = shuffle(userColor)[0];  //乱序后获得随机颜色
            socket.broadcast.emit('message', {
                user: SYSTEM,
                content: `${username}加入了聊天`,
                createAt: new Date().toLocaleString()
            });
            socketObj[username] = socket
        }
    });

    //监听进入房间的事件
    socket.on('join',room=>{
        //判断一下用户是否进入了房间，如果没有就让他进入房间内
        if (username && rooms.indexOf(room) === -1){
            //socket.join表示进入某个房间
            socket.join(room);
            rooms.push(room);

            //这里发送个joined事件，让前后端监听后，控制房间按钮的显隐
            socket.emit('joined',room)

            //通知一下自己
            socket.send({
                user : SYSTEM,
                color,
                content : `你已加入${room}房间`,
                createAt : new Date().toLocaleString()
            });
        }
    })

    //监听离开房间的事件
    socket.on('leave',room => {
        //index为房间在rooms中的索引，为方便删除
        let index = rooms.indexOf(room);
        if(index !== -1){
            socket.leave(room); //离开房间
            socket.splice(index,1) //删掉该房间

            //这里发送个leaved事件，让前后端监听，控制房间按钮的显示和隐藏
            socket.emit('leaved',room);

            socket.send({
                user: SYSTEM,
                color,
                content: `你已离开${room}战队`,
                createAt: new Date().toLocaleString()
            });
            
        }
    })

});
