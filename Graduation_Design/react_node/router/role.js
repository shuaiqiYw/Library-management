const express = require("express")
const router = express.Router()
const {
    getRoleList
} = require("../module/manage/handleRole")




// 获取所有管理员列表
router.get("/getRoleList", async (req,res)=>{
    let result = await getRoleList();
    res.send(result)
})


module.exports = router