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

const getAcount = async () => {
    let result = await mongoAccount.find({})
    return {code:1, value: "获取分类成功", data: result}
}

module.exports = {
    addGoodAccount,
    getAcount
}