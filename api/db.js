const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ygmongo');

const db = mongoose.connection;

db.once('error',()=>{
    console.log('Mongo connection error');
});

db.once('open',()=>{
    console.log('Mongo connection successed');
});

const loginSchema = mongoose.Schema({
    account: String,
    password: String
});

//坑、坑、坑，mongoose会自动将集合加s，并且变为小写，导致在mongodb中找不到
const Models = {
    Login: mongoose.model('Users', loginSchema)
};

module.exports = Models;

