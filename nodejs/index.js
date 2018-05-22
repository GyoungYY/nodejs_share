const express = require('express');
const store = require('./router/store')
const mongoose = require("mongoose");

const bodyParser = require("body-parser")

//这一句是连接上数据库
var db = mongoose.connect('mongodb://localhost:27017/myDbs');

//这里的myDbs是数据库的名字，不是表的名字

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', store)
app.listen(3000, () => {
    console.log('app listening on port 3000.')
})


