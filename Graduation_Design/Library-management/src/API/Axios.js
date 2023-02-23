import axios from "axios"
import { message } from 'antd';

axios.interceptors.request.use(function (config) {
    console.log(config);
    // 在发送请求之前做些什么
    //携带cookie
    config.withCredentials = true
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 可以报错信息 
async function createAxios(type,url,data){
    //判断请求
    if(type.toLocaleLowerCase() === 'get'){
        return await new Promise((res,rej)=>{
            getAxios(url,data,res,rej)
        })
    }
    return await new Promise((res,rej)=>{
        postAxios(url,data,res,rej)
    })
}

// get获取
function getAxios(url,data = {},res,rej){
    axios.get(url,{
        params:data
    }).then(( {data} )=>{
        if(data.code){
            message.success({
                content:data.value,
                duration:1
            })
        }else{
            message.error({
                content:data.value,
                duration:1
            })
        }
        res(data)
    }).catch((err)=>{
        rej(err)
    })
}

// post获取
function postAxios(url,data = {},res,rej){
    axios.post(url,data).then(( {data} )=>{
        if(data.code){
            message.success({
                content:data.value,
                duration:1
            })
        }else{
            message.error({
                content:data.value,
                duration:1
            })
        }
        res(data)
    }).catch((err)=>{
        rej(err)
    })
}



export default createAxios