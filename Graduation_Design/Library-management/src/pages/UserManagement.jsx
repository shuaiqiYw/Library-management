import React, {useEffect, useState} from 'react'
import { Button, Card, Table, Popconfirm } from 'antd'
import "../assets/css/account.scss"
import { Link } from "react-router-dom";
import { getRoleList } from '../API/AxiosURL';



const { Column } = Table

export default function UserManagement() {

    const [arr, setArr] = useState([])

    const handlePage = (val) => {
        console.log(val);
    }

    useEffect(()=>{
        getRoleList().then(({data}) => {
            console.log(data);
            setArr(data)
        })
    },[])


    return (
        <div className='goods'>
            <Card
                size="small"
            >
                <Table
                    dataSource={arr}
                    onChange={handlePage}
                    rowKey={(record) => { return record._id; }}
                >
                    <Column title="用户名" dataIndex="roleAccount" />
                    <Column 
                        title="操作" 
                        dataIndex="handler"
                        render={(text,record,index)=>{
                            return (
                                <>
                                    <Button type="primary" style={{marginLeft: "10px"}}>查看</Button>
                                    <Button type="primary" style={{marginLeft: "10px"}}><Link to="/home/role">编辑</Link></Button>
                                    <Popconfirm
                                        title="你确认删除该管理员吗？"
                                        okText="确认"
                                        cancelText="取消"
                                        disabled={!record.status}
                                    >
                                        <Button type="default" style={{marginLeft:"12px",color:"#8c8c8c",padding: "0px 10px"}}>删除</Button>
                                    </Popconfirm>
                                </>
                            )
                        }}
                    />
                </Table>
            </Card>
        </div>
    )
}
