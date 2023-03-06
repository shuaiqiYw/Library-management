import React, { useEffect, useState } from "react";
import { Card, Table, Button, Tag } from 'antd';
import { getBooksList } from "../../API/AxiosURL"
import BorrowManagement from "../../Components/goods/BorrowManagement"
import "../../assets/css/account.scss"
import { Link } from "react-router-dom";
import "../../router/index"

const { Column } = Table;

export default function GoodsAccount() {

    const [bookList,setBookList] = useState([])

    useEffect(()=>{
        getBooksList().then(({data})=>{
            setBookList(data)
        })
    },[])

    return (
        <div className="goods">
            <Card
                size="small"
                title={<BorrowManagement setBookList={setBookList}/>}
                extra={<Button type="primary"><Link to="/home/addBooks">新增图书</Link></Button>}
            >
                <Table 
                    dataSource={bookList}
                    pagination={bookList.length}
                    rowKey={(val)=>{return val._id}}
                >
                    <Column title="分类" dataIndex="classify" />
                    <Column title="书名" dataIndex="bookName" />
                    <Column title="描述" dataIndex="describe" />
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
                                    <span>借阅</span>
                                    <span style={{marginLeft:"12px"}}>归还</span>
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