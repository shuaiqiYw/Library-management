import React, {useEffect, useState} from 'react'
import { Button, Card, Table, Popconfirm, Modal } from 'antd'
import "../assets/css/account.scss"
import { getRoleList, deleteRole } from '../API/AxiosURL';



const { Column } = Table
let roleAccount = ""
let rolePassword = ""
let roleAbout = ""
let roleDate = ""

export default function UserManagement() {

    const [arr, setArr] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handlePage = (val) => {
        console.log(val);
    }

    useEffect(()=>{
        getRoleList().then(({data}) => {
            console.log(data);
            setArr(data)
        })
    },[])

    // 查看
    const lookInfo = (val) => {
        var date = new Date(val.roleDate);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let time = y + '-' + m + '-' + d+' '+h+':'+minute; 
        roleAccount = val.roleAccount
        rolePassword = val.rolePassword
        roleAbout = val.roleAbout
        roleDate = time
        setIsModalOpen(true);
    }

    // 编辑
    const editInfo = () => {
        
    }

    // 删除
    const deleteInfo = (id) => {
        deleteRole({id}).then(({data}) => {
            setArr(data)
        })
    }

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
                                    <Button type="primary" style={{marginLeft: "10px"}} onClick={()=>{lookInfo(record)}}>查看</Button>
                                    <Button type="primary" style={{marginLeft: "10px"}} onClick={editInfo}>编辑</Button>
                                    <Popconfirm
                                        title="你确认删除该管理员吗？"
                                        okText="确认"
                                        cancelText="取消"
                                        onConfirm={()=>{deleteInfo(record._id)}}
                                    >
                                        <Button type="default" style={{marginLeft:"12px",color:"#8c8c8c",padding: "0px 10px"}}>删除</Button>
                                    </Popconfirm>
                                    <Modal
                                        title="查看信息" 
                                        open={isModalOpen} 
                                        onCancel={handleCancel}
                                        footer={null}
                                    >
                                        <p>用户名：{roleAccount}</p>
                                        <p>密码：{rolePassword}</p>
                                        <p>授权人：{roleAbout}</p>
                                        <p>授权时间：{roleDate}</p>
                                    </Modal>
                                </>
                            )
                        }}
                    />
                </Table>
            </Card>
        </div>
    )
}
