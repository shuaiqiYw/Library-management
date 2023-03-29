import createAxios from './Axios'

// 请求配置默认值
let url = 'http://localhost:8080'


// 登录
export const login = (data) => createAxios("post", url+"/login/submit", data)
// 天气与地址
export const weather = () => createAxios("get", url+"/login/weather")
// 整体组件的session配置，自动登录
export const avoidLand = () => createAxios("post", url+"/login/avoidLand")
// home组件退出session
export const exitSession = () => createAxios("get", url+"/login/removeexit")

// 添加分类
export const addAcount = (value) => createAxios("post", url+"/goods/add",value)
// 请求所有分类
export const getAcount = () => createAxios("get", url+"/goods/getAcount")
// 分类-分页请求
export const getPaging = (value) => createAxios("get", url+"/goods/getPaging",value)
// 分类-修改分类名
export const updateAccountName = (value) => createAxios("post", url+"/goods/updateName",value)
// 分类-删除分类名
export const delAccountName = (value) => createAxios("post", url+"/goods/deleteName",value)

// 信息管理-新增图书  获取所有分类
export const getAcountAll = () => createAxios("get", url+"/goods/getAcountAll")
// 信息管理-新增图书  获取所有图书
export const getBooksList = () => createAxios("get", url+"/goods/getBooksList")
// 信息管理-新增图书  提交
export const addNewBook = (value) => createAxios("post", url+"/goods/addNewBook",value)
// 信息管理-搜索图书
export const searchBook = (value) => createAxios("post", url+"/goods/searchBook",value)
// 信息管理- 分页
export const getBookPage = (value) => createAxios("get", url+"/goods/getBookPage",value)
// 信息管理- 下架
export const soldOut = (value) => createAxios("post", url+"/goods/soldOut",value)
// 信息管理- 编辑
export const editOk = (value) => createAxios("post", url+"/goods/editOk",value)
// 信息管理- 上传图片地址
export const uploadPicture = url+"/goods/uploadPicture"
// 信息管理- 删除图片
export const removeImg = (value) => createAxios("post", url+"/goods/removeImg", value)


// 角色管理 --获取所有管理员角色
export const getRoleList = () => createAxios("get", url+"/role/getRoleList")
// 角色管理 --添加管理员角色
export const addRole = (value) => createAxios("post", url+"/role/addRole", value)
// 角色管理 --删除管理员角色
export const deleteRole = (value) => createAxios("post", url+"/role/deleteRole", value)












