const express = require("express")
const router = express.Router();
const {
    setLogin
} = require("../module/manage/handleLogin")

router.post("/submit", async (req,res)=>{
    let result = await setLogin(req.body)
    res.send(result)
})

module.exports = router