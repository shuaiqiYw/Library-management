import React from "react";
import { Card, Table, Button } from 'antd';
import BorrowManagement from "../../Components/goods/BorrowManagement"
import "../../assets/css/account.scss"
import { Link } from "react-router-dom";
import "../../router/index"


export default function GoodsAccount() {

    const { Column } = Table;

    const arr = []

    return (
        <div className="goods">
            <Card
                size="small"
                title={<BorrowManagement />}
                extra={<Button type="primary"><Link to="/home/addBooks">新增图书</Link></Button>}
            >
                <Table 
                    dataSource={arr}
                    pagination={100}
                >
                    <Column title="分类" dataIndex="classify" />
                    <Column title="书名" dataIndex="bookName" />
                    <Column title="描述" dataIndex="describe" />
                    <Column title="状态" dataIndex="status" />
                    <Column title="操作" dataIndex="handle" />
                </Table>
            </Card>
        </div>
    )
}