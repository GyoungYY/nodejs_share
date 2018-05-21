const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    mid :String,
    company : String,
    shopName : String,
    status : String
}, { collection: 'store'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('store',storeSchema);
