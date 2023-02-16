//引入路由组件
import Login from "../pages/Login";
import Home from "../pages/Home"

const route = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    }
]

export default route