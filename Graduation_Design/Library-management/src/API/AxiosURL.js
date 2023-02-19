import createAxios from './Axios'

// 请求配置默认值
let url = 'http://localhost:8080'


// 登录
export const login = (data) => createAxios("post", url+"/login/submit", data)
// 天气与地址
export const weather = () => createAxios("get", url+"/login/weather")













