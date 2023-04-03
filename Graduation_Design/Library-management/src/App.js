import { useEffect } from "react"
import { useRoutes } from "react-router-dom" 
import route from "./router/index"
import { avoidLand } from "./API/AxiosURL"
import { useNavigate } from 'react-router-dom';
import { setSession } from "./API/session";

function App() {
  let router = useRoutes(route)
  const navigate = useNavigate()


  //设置自动登录验证
  useEffect(()=>{
      avoidLand().then((data)=>{
        if(!data.code){
          navigate("/")
        }else{
          setSession("key",data.data.data)
          navigate("/home/good",{
            state:{
              name:"图书分类"
            }
          })
        }
      })
      // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;
