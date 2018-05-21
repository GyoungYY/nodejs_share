//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Store = require("../models/storeSchema");

// 查询所有店铺信息路由
router.get("/store", (req, res) => {
    Store.find({})
        .sort({update_at: -1})
        .then(stores => {
            res.json(stores);
        })
        .catch(err => {
            res.json(err);
        });
});

// 通过ObjectId查询单个店铺信息路由
router.get("/store/:id", (req, res) => {
    Store.findById(req.params.id)
        .then(store => {
            res.json(store);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个店铺信息路由
router.post("/store", (req, res) => {
    //使用Store model上的create方法储存数据
    Store.create(req.body, (err, store) => {
        if (err) {
            res.json(err);
        } else {
            res.json(store);
        }
    });
});

//更新店铺信息数据路由
router.put("/store/:id", (req, res) => {
    Store.findOneAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                mid: req.body.mid,
                company: req.body.company,
                shopName: req.body.shopName,
                status: req.body.status
            }
        },
        {
            new: true
        }
    )
        .then(store => res.json(store))
        .catch(err => res.json(err));
});

//删除一条店铺信息路由
router.delete("/store/:id", (req, res) => {
    Store.findOneAndRemove({
        _id: req.params.id
    })
        .then(store => res.send(`${store.shopName}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;




















