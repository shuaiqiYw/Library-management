const mongoose = require("mongoose");
const mongoLogin = require("./mongoLogin");

// 登录数据库
let schema = new mongoose.Schema(
    {
        accountName:String,  // 分类名
        accountTime:Date,  // 谁添加
        accountAbout:{
            type: mongoose.Schema.Types.ObjectId,  // 表关联
            ref: mongoLogin
        }
    }
)

module.exports = mongoose.model("mongoAccount", schema)
