import { Button, Form, Input } from 'antd';
import { useEffect, useCallback } from 'react';
import "../assets/css/login.scss"


export default function Login() {
    // 设置表单数据
    const [form] = Form.useForm();

    // 获取表单数据
    useEffect(() => {
        form.validateFields(['username','password']).then((data)=>{
            console.log(data);
        })
    }, [form]);

    // 账号验证
    const validatorAccount = useCallback((_, value) => {
        let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;
        return new Promise((res, rej) => {
            if (value === "") {
                rej("账号不能为空！");
            } else if (!reg.test(value)) {
                rej("需要输入3-6个字符");
            } else {
                res()
            }
        })
    }, [])

    // 密码验证
    const validatorPassWord = useCallback((_, value) => {
        let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]{}:;',.<>/?]{6,15}$/;
        return new Promise((res, rej) => {
            if (value === "") {
                rej("密码不能为空！");
            } else if (!reg.test(value)) {
                rej("密码长度为6-15个字符，不能为中文");
            } else {
                res()
            }
        })
    }, [])

    const onCheck = async () => {
        try {
            const values = await form.validateFields(['username','password']);
            if(values.username && values.password){
                // 登录

            }
        } catch (errorInfo) {
            // 验证不通过
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <div className="login_box">
            <div className="login_wrap">
                <p className="login_text">图书管理系统</p>
                <div className="login_form">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 14 }}
                        style={{ maxWidth: 450 }}
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            validateTrigger="onBlur"
                            rules={[{
                                required: true,
                                validator: validatorAccount
                            }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            validateTrigger="onBlur"
                            rules={[{ 
                                required: true,
                                validator:validatorPassWord
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginTop: 20 }}>
                            <Button type="primary" htmlType="submit" onClick={onCheck}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
