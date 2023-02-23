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












