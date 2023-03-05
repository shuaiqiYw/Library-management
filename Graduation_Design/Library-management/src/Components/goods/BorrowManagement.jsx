import React from "react";
import { Select, Input, Button } from "antd";
// import { useState } from "react";
// import { addAcount } from "../../API/AxiosURL";

import "../../assets/css/borrowManagement.scss"

export default function BorrowManagement() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className="borrowManagement">
            <Select
                defaultValue="classify"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                    value: 'classify',
                    label: '按分类搜索',
                    },
                    {
                    value: 'name',
                    label: '按名称搜索',
                    }
                ]}
            />
            <Input className="searchBook" placeholder="请输入"></Input>
            <Button type="primary">搜素</Button>
        </div>
    )
}