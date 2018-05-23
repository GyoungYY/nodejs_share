// 任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。
// 在NodeJS中，可以通过process对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，process不是内置模块，而是一个全局对象，因此在任何地方都可以直接使用。
//属性、方法、事件

// 如何获取命令行参数
process.argv.slice(2);

// 如何退出程序
process.exit(1);

//退出事件
process.on('exit', (code) => {
    console.log(`即将退出，退出码：${code}`);
});



// NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应
// process.stdin、process.stdout和process.stderr，第一个是只读数据流，后边两个是只写数据流

//使用child_process模块可以创建和控制子进程。

var child = child_process.spawn('node', [ 'xxx.js' ]);

child.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

child.on('close', function (code) {
    console.log('child process exited with code ' + code);
});

//进程之间可以通过信号互相通信
/* parent.js */
var child = child_process.spawn('node', [ 'child.js' ]);

child.kill('SIGTERM');

/* child.js */
process.on('SIGTERM', function () {
    cleanUp();
    process.exit(0);
});

//如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据
/* parent.js */
var child = child_process.spawn('node', [ 'child.js' ], {
    stdio: [ 0, 1, 2, 'ipc' ]
});

child.on('message', function (msg) {
console.log(msg);
});

child.send({ hello: 'hello' });

/* child.js */
process.on('message', function (msg) {
msg.hello = msg.hello.toUpperCase();
process.send(msg);
});


// cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。
// 使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。