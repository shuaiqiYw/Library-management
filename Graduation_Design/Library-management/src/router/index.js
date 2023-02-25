//引入路由组件
import Login from "../pages/Login";
import Home from "../pages/Home"
import HomePage from "../pages/HomePage";
import GoodsAcca from "../pages/goods/GoodsAcca"
import GoodsAccount from "../pages/goods/GoodsAccount";

const route = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: "page",
                element:<HomePage />
            },
            {
                path: "good",
                element:<GoodsAcca />
            },
            {
                path: "account",
                element:<GoodsAccount />
            }
        ]
    }
]

export default route