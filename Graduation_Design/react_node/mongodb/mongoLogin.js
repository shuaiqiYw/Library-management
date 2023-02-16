const mongoose = require("mongoose");

// 登录数据库
let schema = new mongoose.Schema(
    {
        loginName:String,
        loginPass:String,
        loginTime:Date
    }
)

module.exports = mongoose.model("mongoLogin", schema)
