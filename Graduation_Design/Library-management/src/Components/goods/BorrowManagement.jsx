import React, { useRef } from "react";
import { Select, Input, Button } from "antd";
// import { useState } from "react";
import { searchBook } from "../../API/AxiosURL";

import "../../assets/css/borrowManagement.scss"

export default function BorrowManagement({setBookList}) {
    
    const inputVal = useRef()
    let selectValue = 'classify'

    const seekBook = () => {
        const param = {
            selectValue: selectValue,
            inputValue:inputVal.current.input.value
        }
        searchBook(param).then(({data}) => {
            setBookList(data)
        })
    }

    const handleChange = (value) => {
        selectValue = value
    };

    return (
        <div className="borrowManagement">
            <Select
                defaultValue="classify"
                onChange={handleChange}
                style={{
                    width: 120,
                }}
                options={[
                    {
                        value: 'classify',
                        label: '按分类搜索',
                    },
                    {
                        value: 'bookName',
                        label: '按名称搜索',
                    }
                ]}
            />
            <Input className="searchBook" placeholder="请输入" ref={inputVal}></Input>
            <Button type="primary" onClick={seekBook}>搜索</Button>
        </div>
    )
}