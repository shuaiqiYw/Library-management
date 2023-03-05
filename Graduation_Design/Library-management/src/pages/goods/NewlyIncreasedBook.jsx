import { useEffect, useState } from "react";
// import { useState } from "react";
import { getAcountAll } from "../../API/AxiosURL";
import { Link } from "react-router-dom";
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
    belongsToTheCategory: "",
    bookName: "",
    bookDescription: "",
}
export default function NewlyIncreasedBook() {

    const [allClass,setallClass] = useState([])

    const handleChange = (value) => {
        console.log(allClass);
    };

    // 请求所有分类
    useEffect(()=>{
        getAcountAll().then(({data})=>{
            setallClass(data)
        })
    },[])

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    return (
        <div className="goods">
            <Card
                size="small"
                extra={<Button type="primary"><Link to="/home/account">返回借阅管理</Link></Button>}
            >
                <Form
                    {...formItemLayout}
                >
                    <Form.Item
                        label="所属类别"
                    >
                        <Select
                            placeholder="请选择"
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChange}
                            options={
                                allClass.map(item => {
                                    return {
                                        value: item._id,
                                        label: item.accountName
                                    }
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item label="图书名称" >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        label="图书描述"
                    >
                        <TextArea showCount maxLength={200} onChange={onChange} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{width:"200px"}}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}