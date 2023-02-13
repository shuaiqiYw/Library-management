// 设置session
export  const setSession = (key,data) => {
    sessionStorage.setItem(key,JSON.stringify(data))
}

// 获取session
export const getSession = (key) =>{
    return JSON.parse(sessionStorage.getItem(key))
}

// 删除session
export const Re = (key)=>{
    sessionStorage.removeItem(key);
}