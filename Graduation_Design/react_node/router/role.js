const express = require("express")
const router = express.Router()
const {
    getRoleList,
    addRole
} = require("../module/manage/handleRole")




// 获取所有管理员列表
router.get("/getRoleList", async (req,res)=>{
    let result = await getRoleList();
    res.send(result)
})

router.post("/addRole", async (req,res)=>{
    let result = await addRole(req.body);
    res.send(result)
})


module.exports = router