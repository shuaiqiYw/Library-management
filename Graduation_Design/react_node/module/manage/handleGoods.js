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

// 删除分类名
const deleteName = async ({id}) => {
    await mongoAccount.deleteOne({_id:id})
    let data = await mongoAccount.find({})
    return {code:1, value: "删除分类名成功", data: data}
}

// 获取所有分类
const getAcountAll = async () => {
    let data = await mongoAccount.find({})
    return {code:1, value: "获取分类成功", data: data}
}

// 获取所有图书列表
const getBooksList = async () => {
    let result = await mongoBookList.find({})
    let len = result.length
    let data = result.splice(0,10)
    return {code:1, value: "获取图书成功", data: {
        data:data,
        len:len
    }}
}

// 添加新图书
const addNewBook = async ({classify, bookName, describe}) => {
    let bol = await mongoBookList.findOne({classify: classify,bookName:bookName});
    if(bol) return {code:0, value: "已存在", data: {}}
    let data = await mongoBookList.create({
        classify:classify,
        bookName:bookName,
        describe:describe
    })
    return {code:1, value: "添加图书成功", data: data}
}

// 根据条件查询图书
const searchBook = async ({selectValue, inputValue}) => {
    let data = {}
    if(inputValue === ""){
        return getBooksList()
    }else{
        if(selectValue === "classify"){
            data = await mongoBookList.find({classify:inputValue})
        }else{
            data = await mongoBookList.find({bookName:inputValue})
        }
    }
    return {code:1, value: "搜索成功", data:data}
}

// 分页获取图书
const getBookPage = async ({current, pageSize}) => {
    let num = current * pageSize - pageSize
    let result = await mongoBookList.find({},{},{skip:num,limit:pageSize})
    return {code:1, value: "搜索成功", data:result}
}

// 借阅归还
const borrowBack = async ({_id,status}) => {
    let msg = status ? "归还成功" : "借阅成功"
    await mongoBookList.updateOne({_id:_id},{status:!status})
    let data = await mongoBookList.find({_id:_id})
    return {code:1, value: msg, data:data}
}

module.exports = {
    addGoodAccount,
    getAcount,
    getPage,
    updateName,
    deleteName,
    getAcountAll,
    getBooksList,
    addNewBook,
    searchBook,
    getBookPage,
    borrowBack
}