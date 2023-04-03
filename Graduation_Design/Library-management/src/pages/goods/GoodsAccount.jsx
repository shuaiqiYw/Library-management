import React, { useEffect, useState } from "react";
import { Card, Table, Button, Tooltip, Popconfirm, Image } from 'antd';
import { getBooksList, getBookPage, soldOut, removeImg, url } from "../../API/AxiosURL"
import BorrowManagement from "../../Components/goods/BorrowManagement"
import "../../assets/css/account.scss"
import { Link, useNavigate } from "react-router-dom";
import "../../router/index"

const { Column } = Table;
let flag = true

export default function GoodsAccount() {

    const navigate = useNavigate();
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
        let arr = record.cover
        removeImg({arr})
        soldOut({id:record._id}).then(({data})=>{
            setBookList(data);
        })
    }

    // 跳转编辑 
    const editTo = (record) => {
        navigate("/home/addBooks",{state:record})
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
                    <Column title="添加时间" dataIndex="addDate" 
                        render={(text, record, index)=>{
                            var date = new Date(record.addDate);
                            var y = date.getFullYear();
                            var m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            var d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            var h = date.getHours();
                            var minute = date.getMinutes();
                            minute = minute < 10 ? ('0' + minute) : minute;
                            let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute;
                            return (<>{time}</>)
                        }}
                    >
                    </Column>
                    <Column title="封面图片" dataIndex="cover" 
                        render={(text, record, index)=>{
                            console.log(url+record?.cover[0]?.imgUrl);
                            return <Image width={50} height={50} src={url+"/"+record?.cover[0]?.imgUrl}></Image>
                        }}
                    />
                    <Column title="操作" dataIndex="handle" 
                        render={(text, record, index)=>{
                            return (
                                <>
                                    <Button type="primary" style={{padding: "0px 10px"}} onClick={()=>{editTo(record)}}>
                                        编辑
                                    </Button>
                                    <Popconfirm
                                        title="你确认下架此书吗？"
                                        description="下架之后读者将无法借阅此书！"
                                        okText="确认"
                                        cancelText="取消"
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