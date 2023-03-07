import React, { useEffect, useState } from "react";
import { Card, Table, Button, Tag, Tooltip, Popconfirm } from 'antd';
import { getBooksList, getBookPage, borrowBack  } from "../../API/AxiosURL"
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

    // 借阅，归还 请求后视图更新
    const confirmHandle = (record) => {
        borrowBack(record).then(({data})=>{
            let newList = [...bookList]
            newList.forEach(item => {
                if(item._id === data[0]._id){
                    item.status = data[0].status
                }
            })
            setBookList([...newList])
        })
    }

    return (
        <div className="goods">
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
                                    <Popconfirm
                                        title="你确认借阅吗？"
                                        description="借阅之后请在15天后归还，否则将受到罚款！"
                                        okText="确认"
                                        cancelText="取消"
                                        disabled={record.status}
                                        onConfirm={() => confirmHandle(record)}
                                    >
                                        <Button style={{color:"#389e0d",padding: "2px 4px"}} disabled={record.status}>借阅</Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="你确认归还吗？"
                                        description="归还之后，5日内不可重复借阅此书！"
                                        okText="确认"
                                        cancelText="取消"
                                        disabled={!record.status}
                                        onConfirm={() => confirmHandle(record)}
                                    >
                                        <Button style={{marginLeft:"12px",color:"#8c8c8c",padding: "2px 4px"}} disabled={!record.status}>归还</Button>
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