//客户端建立连接，

let socket = io();

//监听与服务端的连接

socket.on('connect',()=>{
    console.log('与服务器连接成功~')
});


//列表list,输入框，content 按钮sendBtn

let list = document.getElementById('list'),
    input = document.getElementById('input'),
    sendBtn = document.getElementById('sendBtn');

/**
 * 定义发送消息的方法
 */
function send() {
    let value = input.value();
    if(value){
        //发送消息给服务器
        socket.emit('message',value);
        input.value = '';
    }else {
        alert('输入的内容不能为空');
    }
}

//点击按钮发送消息
sendBtn.onclick = send;


/**
 * 定义回车发送消息的方法
*/
function enterSend(event) {
    let code = event.keyCode;
    if (code = 13) send();
}

/**
 * 定义输入框onkeydown的时候发送消息
 */
input.onkeydown = function(event) {
    enterSend(event);
};

//监听message事件来接受服务端发来的消息
socket.on('message',data =>{
    //创建新的li元素，最终将其添加的list列表中
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<p style="color: #ccc;"><span class="user" style="color:${data.color}">${data.user} </span>${data.createAt}</p>
    <p class="content" style="background:${data.color}">${data.content}</p>`;

    //将li添加到list列表中
    list.appendChild(li);
    //将聊天区域的滚动条设置到最新内容位置
    list.scrollTop = list.scrollHeight;
});

/**
 * 定义私聊的方法
 */
function privateChat(event) {
    let target = event.target;

    //拿到对应的用户名
    let user = target.innerHTML;
    //只用class为user的才是目标元素
    if (target.className === 'user'){
        //将@的用户名显示在input输入框中
        input.value = `@${user}`;
    }

}

//点击进行私聊
list.onclick = function (event) {
    privateChat(event);

};

/**
 * 进入房间的方法
 * @param room
 */
function join(room) {
    socket.emit('join',room);
}


//监听是否已进入房间
//如果显示进入房间，就显示离开房间按钮
socket.io('joined',room =>{
    document.getElementById(`join-${room}`).style.display = 'none';
    document.getElementById(`leave-${room}`).style.display = 'inline-block';
});

/**
 * 离开房间的方法
 */
function leave(room) {
    socket.emit('leave',room);
}

//监听是否已经离开房间，如果已离开房间，就显示进入房间按钮
socket.on('leaved',room=>{
    document.getElementById(`leave-${room}`).style.display = 'none';
    document.getElementById(`join-${room}`).style.display = 'inline-block';
});

