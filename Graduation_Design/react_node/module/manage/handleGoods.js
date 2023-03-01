const mongoAccount = require("../../mongodb/mongoAccount");

// 添加分类
const addGoodAccount = async ({valAccount},id) => {
    if(!id) return {code:0,value:"账号未登录",data:{}}
    // 查询是否存在
    let bol = await mongoAccount.findOne({accountAbout: id.data._id,accountName:valAccount});
    if(bol) return {code:0, value: "已存在", data: {}}
    let result = await mongoAccount.create({accountAbout: id.data._id,accountName:valAccount, accountTime: new Date()});
    return {code:1, value: "分类添加成功", data: result}
}

// 获取分类
const getAcount = async () => {
    let result = await mongoAccount.find({})
    let len = result.length
    let data = result.splice(0,10)
    return {code:1, value: "获取分类成功", data: {
        len,
        data
    }}
}

// 分类-分页请求
const getPage = async ({current, pageSize}) => {
    let num = current * pageSize - pageSize
    let result = await mongoAccount.find({},{},{skip:num,limit:pageSize})
    return {code:1, value: "分页获取成功", data: result}
}

module.exports = {
    addGoodAccount,
    getAcount,
    getPage
}