const cors = require("cors");

module.exports = cors({
    origin:"http://localhost:3000",  // 允许访问的地址
    credentials:true  // 可以传递  请求头数据
})