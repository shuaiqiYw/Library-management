import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, Form, Input, message } from 'antd'
import { getRoleList, addRole } from '../API/AxiosURL'


const { Column } = Table
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const initObj = {}

export default function RoleManagement() {

    const [messageApi, contextHolder] = message.useMessage();
    const [roleAccount, setRoleAccount] = useState('')
    const [rolePassword, setRolePassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [arr, setArr] = useState([])
    const [form] = Form.useForm();

    // useEffect(() => {
    //     form.validateFields([]);
    // }, [form]);

    // 模拟生命周期--挂载前
    useEffect(() => {
        getRoleList().then(({data}) => {
            setArr(data)
        })
    },[]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 确认提交表单
    const onFinish = async (value) => {
        if(value.roleAccount&&value.rolePassword){
            let {data} = await addRole({roleAccount:value.roleAccount,rolePassword:value.rolePassword})
            console.log(data);
        }
        setIsModalOpen(false);
    };


    const handlePage = (val) => {
        console.log(val);
    }

    return (
        <div className='goods'>
            <Card
                size="small"
                extra={<Button type='primary' onClick={()=>{setIsModalOpen(true)}}>添加管理员</Button>}
            >
                <Table
                    dataSource={arr}
                    onChange={handlePage}
                    rowKey={(record) => { return record._id; }}
                >
                    <Column title="角色名称" dataIndex="roleAccount" />
                    <Column
                        title="添加时间"
                        dataIndex="roleDate"
                        render={(text,record,index)=>{
                            var date = new Date(record.roleDate);
                            var y = date.getFullYear();
                            var m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            var d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            var h = date.getHours();
                            var minute = date.getMinutes();
                            minute = minute < 10 ? ('0' + minute) : minute;
                            let time = y + '-' + m + '-' + d+' '+h+':'+minute; 
                            return (
                                <>
                                    {time}
                                </>
                            )
                        }}
                    />
                    <Column title="授权人" dataIndex="roleAbout" />
                </Table>
            </Card>
            {contextHolder}
            <Modal
                title="添加管理员" 
                open={isModalOpen} 
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    initialValues={initObj}
                >

                    <Form.Item 
                        name="roleAccount"
                        label="账号" 
                        rules={[
                            {
                              required: true,
                              message: '请输入账号',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" value={roleAccount} />
                    </Form.Item>

                    <Form.Item 
                        name="rolePassword"
                        label="密码" 
                        rules={[
                            {
                              required: true,
                              message: '请输入密码',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" value={rolePassword} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button key="submit" type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
