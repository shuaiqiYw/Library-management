const express = require("express")
const multer  = require('multer')
const router = express.Router();
const {
    addGoodAccount,
    getAcount,
    getPage,
    updateName,
    deleteName,
    getAcountAll,
    getBooksList,
    addNewBook,
    searchBook,
    getBookPage,
    soldOut,
    editOk,
    removeImg
} 
 = require("../module/manage/handleGoods")
const upload = require("../module/plugin/multer") 

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

// 获取所有分类
router.get("/getAcountAll", async (req,res)=>{
    let result = await getAcountAll();
    res.send(result)
})

// 获取所有图书
router.get("/getBooksList", async (req,res)=>{
    let result = await getBooksList();
    res.send(result)
})

// 新增图书
router.post("/addNewBook", async (req,res)=>{
    let result = await addNewBook(req.body);
    res.send(result)
})

// 搜索图书
router.post("/searchBook", async (req,res)=>{
    let result = await searchBook(req.body);
    res.send(result)
})

// 分页获取图书
router.get("/getBookPage", async (req,res)=>{
    let result = await getBookPage(req.query);
    res.send(result)
})

// 下架书籍
router.post("/soldOut", async (req,res)=>{
    let result = await soldOut(req.body);
    res.send(result)
})

// 编辑书籍
router.post("/editOk", async (req,res)=>{
    let result = await editOk(req.body);
    res.send(result)
})

// 上传图片
router.post("/uploadPicture", (req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.  上传错误
            return res.send({code:0, value: "上传错误!", data:{}})
        } else if (err) {
            // An unknown error occurred when uploading.  未知错误
            return res.send({code:0, value: "未知错误!", data:{}})
        }
        let imgUrl = "uploadImg/" + req.file.filename
        // Everything went fine.
        return res.send({code:1, value: "上传成功!", data:{imgUrl}})
    })
})

// 删除图片
router.post("/removeImg", (req,res)=>{
    removeImg(req.body);
    res.send({code:1,value:"图片删除成功",data:{}})
})

module.exports = router