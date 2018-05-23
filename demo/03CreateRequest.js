// 看看客户端模式下如何工作。为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体

var options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var request = http.request(options, function (response) { });

request.write('Hello World');
request.end();


// 由于HTTP请求中GET请求是最常见的一种，并且不需要请求体，因此http模块也提供了以下便捷API。
http.get('http://www.example.com/', function (response) { });


// 当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。
// 在回调函数中，除了可以使用response对象访问响应头数据外，还能把response对象当作一个只读数据流来访问响应体数据。
http.get('http://www.example.com/', function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});