const express = require("express")
const app = express();

// 配置
app.use(require("./module/plugin/cors"))
app.use(require("./module/plugin/session"))
app.use(express.static("./public"))
app.use(express.urlencoded({extends:false}))
app.use(express.json())
//配置子路由
app.use("/login",require("./router/login"))
app.use("/goods",require("./router/goods"))
//数据库
require("./mongodb/mongoose")


app.listen("8080",()=>{
    console.log("8080端口启动");
})