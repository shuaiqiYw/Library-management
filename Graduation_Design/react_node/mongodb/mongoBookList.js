const mongoose = require("mongoose")

// 新建图书列表-表
let schema = new mongoose.Schema(
    {
        classify: String,
        bookName: String,
        describe: String,
        status: {
            type: Boolean,
            default: false
        }    // true借阅中   false可借阅
    }
)

module.exports = mongoose.model("mongoBookList", schema)