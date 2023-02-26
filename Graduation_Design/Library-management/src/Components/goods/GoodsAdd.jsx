import React from "react";
import { Button, Modal, Input } from "antd";
import { useState } from "react";
import { addAcount } from "../../API/AxiosURL";

export default function GoodsAdd({setArr,arr}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    let valAccount = null

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    // 确认
    const handleOk = async () => {
      let {data} = await addAcount({valAccount})
      setArr([data,...arr])
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    // 输入框
    const handleInputChange = (e) => {
        valAccount = e.target.value
    }

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
                <Input placeholder="请输入类别" style={{ marginTop: "25px" }} onChange={handleInputChange} />
            </Modal>
        </div>
    )
}