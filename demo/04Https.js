// https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书。通过key和cert字段指定了HTTPS服务器使用的私钥和公钥。

var options = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cer')
};

var server = https.createServer(options, function (request, response) {
    // ...
});