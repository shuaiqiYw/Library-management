const express = require("express")
const router = express.Router();
const {
    addGoodAccount,
    getAcount,
    getPage,
    updateName,
    deleteName
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

// 分类-分页请求
router.get("/getPaging", async (req,res)=>{
    let result = await getPage(req.query);
    res.send(result)
})

// 修改分类名路由
router.post("/updateName", async (req,res)=>{
    let result = await updateName(req.body);
    res.send(result)
})

// 删除分类名路由
router.post("/deleteName", async (req,res)=>{
    let result = await deleteName(req.body);
    res.send(result)
})

module.exports = router