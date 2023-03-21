const mongoRole = require("../../mongodb/mongoRole")


// 获取所有管理员列表
const getRoleList = async () => {
    let list = await mongoRole.find({})
    return {code: 1, data: list, value: "管理员列表获取成功!"}
}

// 添加管理员角色
const addRole = async ({roleAccount,rolePassword}) => {
    console.log(roleAccount,rolePassword);
    // let list = await mongoRole.find({})
    return {code: 1, data: {}, value: "管理员列表添加成功!"}
}




module.exports = {
    getRoleList,
    addRole
}