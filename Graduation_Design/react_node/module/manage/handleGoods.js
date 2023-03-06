const mongoAccount = require("../../mongodb/mongoAccount");
const mongoBookList = require("../../mongodb/mongoBookList");

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

// 修改分类名
const updateName = async ({id,str}) => {
    await mongoAccount.updateOne({_id:id},{accountName:str})
    let data = await mongoAccount.find({_id:id})
    return {code:1, value: "修改分类名成功", data: data}
}

const deleteName = async ({id}) => {
    await mongoAccount.deleteOne({_id:id})
    let data = await mongoAccount.find({})
    return {code:1, value: "删除分类名成功", data: data}
}

const getAcountAll = async () => {
    let data = await mongoAccount.find({})
    return {code:1, value: "获取分类成功", data: data}
}

const getBooksList = async () => {
    let data = await mongoBookList.find({})
    return {code:1, value: "获取图书成功", data: data}
}

const addNewBook = async ({classify, bookName, describe}) => {
    await mongoBookList.create({
        classify:classify,
        bookName:bookName,
        describe:describe
    })
    return {code:1, value: "添加图书成功", data: {}}
}



module.exports = {
    addGoodAccount,
    getAcount,
    getPage,
    updateName,
    deleteName,
    getAcountAll,
    getBooksList,
    addNewBook
}