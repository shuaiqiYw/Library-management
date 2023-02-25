import React from "react";
import { Button, Modal, Select, Input } from "antd";
import { useState, useRef } from "react";

let num = "123"
export default function GoodsAdd() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputVal = useRef()
    

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    // 确认
    const handleOk = () => {
      setIsModalOpen(false);
      let inputValue = inputVal.current.input.value
      console.log(num,inputValue);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    // 下拉框
    const handleChange = (value) => {
        num = value
    };

    return (
        <div>
            <Button type="primary"onClick={showModal}>添加分类</Button>
            <Modal 
                title="添加分类" 
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
                <Select
                    defaultValue="lucy"
                    style={{
                        width: "100%",
                        marginTop: "12px"
                    }}
                    onChange={handleChange}
                    options={[
                        {
                        value: 'jack',
                        label: 'Jack',
                        },
                        {
                        value: 'lucy',
                        label: 'Lucy',
                        },
                        {
                        value: 'Yiminghe',
                        label: 'yiminghe',
                        },
                        {
                        value: 'disabled',
                        label: 'Disabled',
                        },
                    ]}
                />
                <Input placeholder="请输入类别" style={{ marginTop: "25px" }} ref={inputVal} />
            </Modal>
        </div>
    )
}