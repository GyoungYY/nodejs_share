const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    mid :String,
    company : String,
    shopName : String,
    status : String
}, { collection: 'store'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个集合取数据，不然会按模型名称的复数形式取对应的集合


module.exports = mongoose.model('store',storeSchema);
