// 图标
import {
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    RedditOutlined,
    FundOutlined,
    BarChartOutlined,
    StockOutlined,
    PieChartOutlined,
    AuditOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
// 侧边栏内容
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    // getItem(<Link to="page" state={{name:"首页"}}>首页</Link>, '1', <HomeOutlined />),
    getItem("图书管理", 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="good" state={{name:"图书分类"}}>图书分类</Link>, '4', <AuditOutlined />),
        getItem(<Link to="account" state={{name:"信息管理"}}>信息管理</Link>, '5', <ProfileOutlined />)
    ]),
    // getItem(<Link to="user" state={{name:"用户管理"}}>用户管理</Link>, '2', <UserOutlined />),
    getItem(<Link to="role" state={{name:"角色管理"}}>角色管理</Link>, '3', <RedditOutlined />, [
        getItem(<Link to="role" state={{name:"角色列表"}}>角色列表</Link>, '31', <UserOutlined />),
        getItem(<Link to="user" state={{name:"角色信息"}}>角色信息</Link>, '32', <UserOutlined />),
    ]),
    // getItem('图形管理', 'sub2', <FundOutlined />, [
    //     getItem('柱形图', '6', <BarChartOutlined />),
    //     getItem('折线图', '7', <StockOutlined />),
    //     getItem('饼状图', '8', <PieChartOutlined />),
    // ]),
];

export default function SiderContent() {
    return (
        <div>
            <Menu
                mode="inline"
                theme="dark"
                items={items}
                defaultOpenKeys={['sub1']}
                defaultSelectedKeys={['4']}
            />
        </div>
    )
}