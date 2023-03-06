import { useEffect, useState } from "react";
// import { useState } from "react";
import { getAcountAll } from "../../API/AxiosURL";
import { Link } from "react-router-dom";
import { addNewBook } from "../../API/AxiosURL"
import "../../assets/css/account.scss"
import "../../router/index"
import {
    Button,
    Card,
    Form,
    Input,
    Select
} from 'antd';
const { TextArea } = Input;
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
// 初始数据
const initObj = {
    classify: "",
    bookName: "",
    describe: "",
}
export default function NewlyIncreasedBook() {

    const [allClass,setallClass] = useState([])
    const [form] = Form.useForm();

    useEffect(() => {
        form.validateFields([]);
    }, [form]);

    // 请求所有分类
    useEffect(()=>{
        getAcountAll().then(({data})=>{
            setallClass(data)
        })
    },[])

    // 提交表单
    const onFinish = (values) => {
        addNewBook(values).then((res)=>{
            form.resetFields()
        })
    }

    return (
        <div className="goods">
            <Card
                size="small"
                extra={<Button type="primary"><Link to="/home/account">返回借阅管理</Link></Button>}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    initialValues={initObj}
                >
                    <Form.Item
                        label="所属类别"
                        name="classify"
                        rules={[
                            {
                              required: true,
                              message: '请输入所属类别',
                            },
                        ]}
                    >
                        <Select
                            allowClear={true}
                            showSearch
                            placeholder="请选择"
                            style={{
                                width: "100%",
                            }}
                            options={
                                allClass.map(item => {
                                    return {
                                        value: item.accountName,
                                        label: item.accountName
                                    }
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item 
                        name="bookName"
                        label="图书名称" 
                        rules={[
                            {
                              required: true,
                              message: '请输入图书名称',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="describe"
                        label="图书描述"
                        rules={[
                            {
                              required: true,
                              message: '请输入图书描述',
                            },
                        ]}
                    >
                        <TextArea showCount maxLength={200} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{width:"200px"}}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}