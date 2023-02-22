const express = require("express")
const axios = require("axios")
const router = express.Router();
const {
    setLogin
} = require("../module/manage/handleLogin")

// 登录
router.post("/submit", async (req,res)=>{
    let result = await setLogin(req.body)
    res.send(result)
})

// 天气
router.get("/weather", async (req,res)=>{
    // 城市   https://ipapi.co/json/
    // http://ip-api.com/json/?lang=zh-CN
    // let {data} = await axios.get("https://ipapi.co/json/");
    // let region = `${data.regionName}-${data.city}`
    // 天气    https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURIComponent(data.city)}
    await axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=武汉`)
    .then(({data})=>{
        res.send({code:1,data:{
            value:data.data[0],
            city:region
        }})
    }).catch(()=>{
        res.send({code:0,value:"天气获取失败",data:region})
    })
})

module.exports = router