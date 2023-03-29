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
const addNewBook = async ({classify, bookName, describe, cover}) => {
    let bol = await mongoBookList.findOne({classify: classify,bookName:bookName});
    if(bol) return {code:0, value: "已存在", data: {}}
    let data = await mongoBookList.create({
        classify:classify,
        bookName:bookName,
        describe:describe,
        addDate: new Date(),
        cover: cover
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

// 下架书籍
const soldOut = async ({id}) => {
    await mongoBookList.deleteOne({_id:id})
    let data = await mongoBookList.find({})
    return {code:1, value: "下架成功!", data:data}
}

// 编辑书籍
const editOk = async ({classify, bookName, describe, id}) => {
    let bol = await mongoBookList.findOne({classify: classify,bookName:bookName});
    if(bol) return {code:0, value: "该分类下已有此书！请重新修改", data: {}}
    await mongoBookList.updateOne({_id:id}, {classify: classify,bookName:bookName,describe:describe})
    return {code:1, value: "编辑成功!", data:{}}
}

// 上传图片
const uploadPicture = async ({}) => {
    return {code:1, value: "上传成功!", data:{}}
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
    soldOut,
    editOk,
    uploadPicture
}