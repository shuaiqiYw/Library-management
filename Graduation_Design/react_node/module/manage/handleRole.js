const mongoRole = require("../../mongodb/mongoRole")


// 获取所有管理员列表
const getRoleList = async () => {
    let list = await mongoRole.find({})
    return {code: 1, data: list, value: "管理员列表获取成功!"}
}





module.exports = {
    getRoleList
}