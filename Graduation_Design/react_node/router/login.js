const express = require("express")
const router = express.Router();

router.post("/submit",(req,res)=>{
    console.log(req,res);
    res.send("123")
})

module.exports = router