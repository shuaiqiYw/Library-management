const multer  = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    // 存放地址
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,"../../public/uploadImg"))
    },
    // 文件名
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
module.exports = multer({ storage: storage }).single("file")