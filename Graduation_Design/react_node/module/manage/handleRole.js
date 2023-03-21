const mongoRole = require("../../mongodb/mongoRole")


// 获取所有管理员列表
const getRoleList = async () => {
    let list = await mongoRole.find({})
    return {code: 1, data: list, value: "管理员列表获取成功!"}
}

// 添加管理员角色
const addRole = async ({roleAccount,rolePassword},id) => {
    let data = await mongoRole.create({
        roleAccount: roleAccount,
        rolePassword: rolePassword,
        roleAbout: id.data.roleAccount,
        roleDate: new Date()
    })
    return {code: 1, data: data, value: "管理员列表添加成功!"}
}

// 删除管理员角色
const deleteRole = async ({id}) => {
    await mongoRole.deleteOne({_id:id})
    let data = await mongoRole.find({})
    return {code: 1, data: data, value: "管理员删除成功"}

}



module.exports = {
    getRoleList,
    addRole,
    deleteRole
}