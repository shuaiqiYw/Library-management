import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, Form, Input } from 'antd'
import { getRoleList } from '../API/AxiosURL'


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

    // 提交表单
    const onFinish = (value) => {
        console.log(value);
        // addNewBook(values).then((res)=>{
        //     form.resetFields()
        // })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 确认
    const handleOk = () => {
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
                    />
                    <Column title="授权人" dataIndex="roleAbout" />
                </Table>
            </Card>
            <Modal
                title="添加管理员" 
                open={isModalOpen} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        确定
                    </Button>
                ]}
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
                        <Input placeholder="请输入" />
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
                        <Input placeholder="请输入" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
