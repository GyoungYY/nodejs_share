// 处理HTTP请求时url模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。

const url = require('url');

// 使用.parse方法来将一个URL字符串转换为URL对象
url.parse('http://www.host.com:8080/p/a/t/h?query=string#hash');

/* =>
{ protocol: 'http:',
  host: 'www.host.com:8080',
  port: '8080',
  hostname: 'www.host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://www.host.com:8080/p/a/t/h?query=string#hash' }
*/

// 反过来，format方法允许将一个URL对象转换为URL字符串
url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/