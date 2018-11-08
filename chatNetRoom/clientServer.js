const net = require('net');
const cout = process.stdout;  //键盘输入模块
const cin = process.stdin;

var client = null;
var nick = '';

cout.write('请输入你的昵称');

//监听命令行的输入
cin.on('data',(chunk)=>{
    if (chunk.toString() != '\r\n') {
        if (client === null) {
            nick = (chunk + '').replace(/[\r\n]/ig, "");
            createClient();

        } else {
            msg = (chunk + '').replace(/[\r\n]/ig, "");
            client.write(JSON.stringify({
                cmd: 'chat',
                msg: msg,
                nick: nick,
            }));

            //判断命令行输出的是否要退出
            if (msg.toLowerCase() == 'exit' || msg.toLowerCase() == 'quit') {
                client.end();
                cin.end();
                return;
            }

            cout.write(`你说：${msg}\n\r`)
        }
    }else {
        cout.write(`请输入昵称~`)
    }
});


function addListener(client) {
    client.on('connect',()=>{
       cout.write(`已连接到服务器\n\r`);
       client.write(JSON.stringify({
           cmd : 'login',
           msg : 'hello server',
           nick : nick
       }));
    });

    client.on('end',(chunk)=>{

    })




    //数据过来触发
    client.on('data',(chunk)=>{
        if (chunk.toString() == '::'){
            client.write(JSON.stringify({
                cmd : 'keep',
                msg : '',
                nick : nick
            }));
            return;
        }
        cout.write(`${chunk}\r\n`);
    });

    //错误事件触发
    client.on('error',(err)=>{
        cout.write(`an error has occured.\n\r${err}`)
    });
}

function createClient() {
    console.log('\033[2J');
    cout.write(`输入'EXIT OR QUIT'退出聊天室.\r\n`);
    client = new net.Socket();
    client.connect({prot:8086/*,host:'1.1.1.69'*/});
    addListener(client);

}