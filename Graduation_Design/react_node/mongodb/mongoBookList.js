const mongoose = require("mongoose")

// 新建图书列表-表
let schema = new mongoose.Schema(
    {
        classify: String,
        bookName: String,
        describe: String,
        addDate: Date,
        cover: Object
    }
)

module.exports = mongoose.model("mongoBookList", schema)