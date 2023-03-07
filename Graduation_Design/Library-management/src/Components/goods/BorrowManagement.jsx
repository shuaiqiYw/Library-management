import React, { useRef } from "react";
import { Select, Input, Button } from "antd";
import { searchBook } from "../../API/AxiosURL";

import "../../assets/css/borrowManagement.scss"

export default function BorrowManagement({setBookList,setLen,flagFun}) {
    
    const inputVal = useRef()
    let selectValue = 'classify'

    const seekBook = () => {
        flagFun(false)
        const param = {
            selectValue: selectValue,
            inputValue:inputVal.current.input.value
        }
        searchBook(param).then(({data}) => {
            if(!inputVal.current.input.value) {
                setBookList(data.data)
                setLen(data.len)
                return;
            }
            setBookList(data)
            setLen(data.length)
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
            <Input className="searchBook" placeholder="请输入" ref={inputVal} allowClear={true}></Input>
            <Button type="primary" onClick={seekBook}>搜索</Button>
        </div>
    )
}