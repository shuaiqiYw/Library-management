const express = require("express")
const router = express.Router();
const {
    addGoodAccount,
    getAcount
} 
 = require("../module/manage/handleGoods")

// 添加分类
router.post("/add", async (req,res)=>{
    let result = await addGoodAccount(req.body,req.session.adminRoot);
    res.send(result)
})

// 获取所有分类
router.get("/getAcount", async (req,res)=>{
    let result = await getAcount();
    res.send(result)
})

module.exports = router