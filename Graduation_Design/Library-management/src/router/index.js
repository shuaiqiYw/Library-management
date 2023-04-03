//引入路由组件
import Login from "../pages/Login";
import Home from "../pages/Home"
import HomePage from "../pages/HomePage";
import GoodsAcca from "../pages/goods/GoodsAcca"
import GoodsAccount from "../pages/goods/GoodsAccount";
import NewlyIncreasedBook from "../pages/goods/NewlyIncreasedBook";
import UserManagement from "../pages/UserManagement";
import RoleManagement from "../pages/RoleManagement";
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
            {
                path:"user",
                element:<UserManagement />
            },
            {
                path:"role",
                element:<RoleManagement />
            }
        ]
    },
    {
        path: "*",
        element: <Redirect to="/home/good" />
    }
]

export default route