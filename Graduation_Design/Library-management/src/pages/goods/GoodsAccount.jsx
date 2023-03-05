import React from "react";
import { Card, Table } from 'antd';
import BorrowManagement from "../../Components/goods/BorrowManagement"
import "../../assets/css/account.scss"



export default function GoodsAccount() {

    const { Column } = Table;

    const arr = []

    return (
        <div className="goods">
            <Card
                size="small"
                extra={<BorrowManagement />}
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