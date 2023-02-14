import createAxios from './Axios'

// 请求配置默认值
let url = 'http://127.0.0.27:8080'


// 登录
export const login = (data) => createAxios("post", url+"/login/submit", data)













