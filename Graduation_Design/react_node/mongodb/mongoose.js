const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/admin").then(()=>{
    console.log("mongoose连接成功");
}).catch(()=>{
    console.log("mongoose连接失败");
})