import React from 'react'
import { Button, Card, Table } from 'antd'
import "../assets/css/account.scss"

/**
* @author
* @function 
**/

const { Column } = Table

export default function RoleManagement() {

    let arr = []

    const handlePage = (val) => {
        console.log(val);
    }

    return (
        <div className='goods'>
            <Card
                size="small"
                extra={<Button>添加管理员</Button>}
            >
                <Table
                    dataSource={arr}
                    onChange={handlePage}
                    rowKey={(record) => { return record._id; }}
                >
                    <Column title="名称" dataIndex="accountName" />
                    <Column
                        title="添加时间"
                        dataIndex="address"
                    />
                    <Column title="授权人" dataIndex="accountName" />
                </Table>
            </Card>
        </div>
    )
}
