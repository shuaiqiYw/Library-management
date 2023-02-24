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
    getItem(<Link to="page">首页</Link>, '1', <HomeOutlined />),
    getItem("图书", 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="good">图书管理</Link>, '4', <AuditOutlined />),
        getItem('分类管理', '5', <ProfileOutlined />)
    ]),
    getItem('用户管理', '2', <UserOutlined />),
    getItem('角色管理', '3', <RedditOutlined />),
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
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
            />
        </div>
    )
}