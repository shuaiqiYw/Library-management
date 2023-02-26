import { useState, useEffect } from "react";
import { Card, Table } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";
import { getAcount } from "../../API/AxiosURL";

export default function GoodsAcca() {

    const { Column } = Table;

    const data = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    // 设置分类展示
    let [arr, setArr] = useState([{}])

    // 获取分类
    useEffect(() => {
        getAcount().then(({ data }) => {
            setArr(data)
        })
    }, [])

    return (
        <div className="goods">
            <Card
                size="small"
                extra={<GoodsAdd setArr={setArr} arr={arr} />}
            >
                <Table 
                    dataSource={arr}
                    rowKey={(row)=>{return row._id}}
                >
                    <Column title="类别" dataIndex="accountName" />
                    <Column title="操作" dataIndex="address" />
                </Table>
            </Card>
        </div>
    )
}