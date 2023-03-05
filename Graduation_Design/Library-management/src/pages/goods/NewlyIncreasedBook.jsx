import React from "react";
// import { useState } from "react";
// import { addAcount } from "../../API/AxiosURL";
import { Link } from "react-router-dom";
import "../../assets/css/account.scss"
import "../../router/index"
import {
    Button,
    Card,
    Form,
    Input,
} from 'antd';
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
export default function NewlyIncreasedBook() {



    return (
        <div className="goods">
            <Card
                size="small"
                extra={<Button type="primary"><Link to="/home/account">返回借阅管理</Link></Button>}
            >
                <Form
                    {...formItemLayout}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="所属类别"
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item label="图书名称" >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        label="图书描述"
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}