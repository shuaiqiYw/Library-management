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
    getItem(<Link to="page" state={{name:"首页"}}>首页</Link>, '1', <HomeOutlined />),
    getItem("图书管理", 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="good" state={{name:"图书分类"}}>图书分类</Link>, '4', <AuditOutlined />),
        getItem(<Link to="account" state={{name:"借阅管理"}}>借阅管理</Link>, '5', <ProfileOutlined />)
    ]),
    getItem('用户', '2', <UserOutlined />),
    getItem('管理员', '3', <RedditOutlined />),
    getItem('图形管理', 'sub2', <FundOutlined />, [
        getItem('柱形图', '6', <BarChartOutlined />),
        getItem('折线图', '7', <StockOutlined />),
        getItem('饼状图', '8', <PieChartOutlined />),
    ]),
];

export default function SiderContent() {
    return (
        <div>
            <Menu
                mode="inline"
                theme="dark"
                items={items}
            />
        </div>
    )
}