//引入路由组件
import Login from "../pages/Login";
import Home from "../pages/Home"
import HomePage from "../pages/HomePage";
import GoodsAcca from "../pages/goods/GoodsAcca"
import GoodsAccount from "../pages/goods/GoodsAccount";
import NewlyIncreasedBook from "../pages/goods/NewlyIncreasedBook";
// 重定向
import Redirect from "../hooks/useRouter"

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
            },
            {
                path:"addBooks",
                element:<NewlyIncreasedBook />
            },
            // {
            //     path:"user",
            //     element:<User/>
            // }
        ]
    },
    {
        path: "*",
        element: <Redirect to="/home/page" />
    }
]

export default route