import React from "react";
import { Button, Modal, Input, message } from "antd";
import { useState } from "react";
import { addAcount } from "../../API/AxiosURL";

export default function GoodsAdd({setArr,arr}) {
    // let valAccount = null
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valAccount,setValAccount] = useState('')

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    // 确认
    const handleOk = async () => {
      if(!valAccount){
        messageApi.open({
            type: 'error',
            content: '请输入类别！',
        });
        return;
      } ;
      let {data} = await addAcount({valAccount})
      setArr([data,...arr])
      setIsModalOpen(false);
      setValAccount('')
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setValAccount('')
    };

    // 输入框
    const handleInputChange = (e) => {
        // valAccount = e.target.value
        setValAccount(e.target.value)
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>新增类别</Button>
            {contextHolder}
            <Modal 
                title="新增类别" 
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
                <Input placeholder="请输入新增图书类别" style={{ marginTop: "25px" }} onChange={handleInputChange} value={valAccount} />
            </Modal>
        </div>
    )
}