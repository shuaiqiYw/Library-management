import { useEffect, useState } from "react";
import { getAcountAll } from "../../API/AxiosURL";
import { Link, useLocation } from "react-router-dom";
import { addNewBook, editOk, uploadPicture } from "../../API/AxiosURL"
import { useNavigate } from "react-router-dom";
import "../../assets/css/account.scss"
import "../../router/index"
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
let initObj = {
    classify: "",
    bookName: "",
    describe: "",
}

export default function NewlyIncreasedBook() {

    const { state } = useLocation()
    const navigate = useNavigate()
    const [allClass, setallClass] = useState([])
    const [form] = Form.useForm();

    if (state) {
        initObj = {
            classify: state.classify,
            bookName: state.bookName,
            describe: state.describe
        }
    }

    // 请求所有分类
    useEffect(() => {
        getAcountAll().then(({ data }) => {
            setallClass(data)
        })

        // 组件销毁时进行函数
        return () => {
            initObj = {
                classify: "",
                bookName: "",
                describe: "",
            }
        }
    }, [])

    // 提交表单
    const onFinish = (values) => {
        if (state) {  // 编辑提交
            console.log('编辑提交');
            editOk({ ...values, id: state._id }).then((res) => {
                if (res.code === 0) return;
                navigate("/home/account")
            })
        } else {  // 正常添加
            values.cover = values.cover.fileList.map(item => {
                return item.response.data
            })
            addNewBook(values).then((res) => {
                form.resetFields()
            })
        }
    }

    // 上传图片发生变化时触发
    const onChange = (file) => {
        // let imgUrlArr = file.fileList.map(item => {
        //     return item.response.data
        // })

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

                    <Form.Item
                    valuePropName="file"
                        name="cover"
                        label="图书封面"
                        rules={[
                            {
                                required: true,
                                message: '请选择图书封面',
                            },
                        ]}
                    >
                        <Upload
                            accept='.jpg,.png'
                            name="file"
                            action={uploadPicture}
                            onChange={onChange}
                            multiple={true}
                            maxCount={5}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}