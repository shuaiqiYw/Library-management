import React, { useEffect, useState } from "react";
import { Card, Table, Button, Tag, Tooltip, Popconfirm } from 'antd';
import { getBooksList, getBookPage, soldOut  } from "../../API/AxiosURL"
import BorrowManagement from "../../Components/goods/BorrowManagement"
import "../../assets/css/account.scss"
import { Link } from "react-router-dom";
import "../../router/index"

const { Column } = Table;
let flag = true

export default function GoodsAccount() {

    const [bookList,setBookList] = useState([])
    const [len,setLen] = useState()

    const flagFun = (val) => {
        flag = val
    }

    useEffect(()=>{
        getBooksList().then(({data})=>{
            setBookList(data.data)
            setLen(data.len)
        })
    },[])

    // 分页点击获取
    const handlePage = async (val) => {
        if(!flag) return;
        let result = await getBookPage({
            current:val.current,
            pageSize:val.pageSize
        })
        setBookList(result.data)
    }

    // 下架
    const confirmHandle = (record) => {
        soldOut({id:record._id}).then(({data})=>{
            setBookList(data);
        })
    }

    return (
        <div className="goods borrowManagement">
            <Card
                size="small"
                title={<BorrowManagement setBookList={setBookList} setLen={setLen} flagFun={flagFun}/>}
                extra={<Button type="primary"><Link to="/home/addBooks">新增图书</Link></Button>}
            >
                <Table 
                    dataSource={bookList}
                    pagination={{total:len}}
                    rowKey={(val)=>{return val._id}}
                    onChange={handlePage}
                >
                    <Column title="分类" dataIndex="classify" />
                    <Column title="书名" dataIndex="bookName" />
                    <Column title="简介" dataIndex="describe" 
                        ellipsis={true}
                        render={(text, record, index)=>{
                            return (
                                <>
                                    <Tooltip title={record.describe} placement="bottomLeft">{record.describe}</Tooltip>      
                                </>
                            )
                        }}    
                    />
                    <Column title="状态" dataIndex="status" 
                        render={(text, record, index)=>{
                            if(record.status){
                                return (
                                    <>
                                        <Tag color="gold">
                                            借阅中...
                                        </Tag>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <Tag color="blue">
                                            可借阅
                                        </Tag>
                                    </>
                                )
                            }
                        }}
                    >
                    </Column>
                    <Column title="操作" dataIndex="handle" 
                        render={(text, record, index)=>{
                            return (
                                <>
                                    <Button type="primary" style={{padding: "0px 10px"}}><Link to="/home/addBooks">编辑</Link></Button>
                                    <Popconfirm
                                        title="你确认下架此书吗？"
                                        description="下架之后读者将无法借阅此书！"
                                        okText="确认"
                                        cancelText="取消"
                                        disabled={!record.status}
                                        onConfirm={() => confirmHandle(record)}
                                    >
                                        <Button type="default" style={{marginLeft:"12px",color:"#8c8c8c",padding: "0px 10px"}}>下架</Button>
                                    </Popconfirm>
                                </>
                            )
                        }}
                    >
                    </Column>
                </Table>
            </Card>
        </div>
    )
}