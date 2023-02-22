const mongoLogin = require("../../mongodb/mongoLogin");

// 设置管理员登录功能
const setLogin = async ({username,password}) => {
    let bol = await mongoLogin.findOne({loginName:username})
    if(!bol) return {code:0,value:"账号不存在"};
    if(bol.loginPass!==password) return {code:0,value:"密码错误"}
    return {code:1,value:"登录成功",data:bol}
}


module.exports = {
    setLogin
}