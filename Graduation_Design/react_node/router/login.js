const express = require("express")
const axios = require("axios")
const router = express.Router();
const {
    setLogin
} = require("../module/manage/handleLogin")


// 退出session路由
router.post("/removeexit", (req,res)=>{
    console.log(2324);
    res.session.adminRoot = ""
    res.send({code:0,value:"退出session",data:{}})
})


// 免登录路由
router.post("/avoidLand", (req,res)=>{
    console.log(req.session.adminRoot);
    if(req.session.adminRoot){
        res.send({code:1,value:"免登录测试",data:req.session.adminRoot})
    }else{
        res.send({code:0,value:"session不存在",data:{}})
    }
})

// 登录
router.post("/submit", async (req,res)=>{
    let result = await setLogin(req.body)
    if(result){
        req.session.adminRoot = result
    } 
    res.send(result)
})

// 天气
router.get("/weather", async (req,res)=>{
    // 城市   https://ipapi.co/json/
    // http://ip-api.com/json/?lang=zh-CN  -->失效
    // let {data} = await axios.get("https://ipapi.co/json/");
    // let region = `${data.regionName}-${data.city}`
    // 天气    https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURIComponent(data.city)}
    await axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=`)
    .then(({data})=>{
        res.send({code:1,data:{
            value:data.data[0],
            city:data.city
        }})
    }).catch(()=>{
        res.send({code:0,value:"天气获取失败"})
    })
})



module.exports = router