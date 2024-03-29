import { useState, useEffect, useRef } from "react";
import { Card, Table, Tag, Popconfirm, Input, Button   } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";
import { getAcount, getPaging, updateAccountName, delAccountName } from "../../API/AxiosURL";
import "../../assets/css/account.scss"

let len = 0

function AmendClassifyName ({handleView}){
    let inpRef = useRef()

    // 点击获取input数据
    const confirmAmend = () => {
        let value = inpRef.current.input.value
        handleView(value)
    }

    return (
        <>
            <p>修改分类名</p>
            <Input className="ClassifyInput" ref={inpRef} placeholder="请输入"></Input>
            <Button type="primary" onClick={confirmAmend} className="ClassifyOk">确认</Button>
        </>
    )
}

export default function GoodsAcca() {

    const { Column } = Table;

    // 设置分类展示
    let [arr, setArr] = useState([])

    // 获取分类
    useEffect(() => {
        getAcount().then(({ data }) => {
            setArr(data.data)
            len = data.len
        })
    }, [])

    // 分页点击获取
    const handlePage = async (val) => {
        let result = await getPaging({
            current:val.current,
            pageSize:val.pageSize
        })
        setArr(result.data)
    }

    // 修改arr数据，改变页面视图
    const handleView = async(value,str) => {
        let {data} = await updateAccountName({id:value._id,str})
        let res = data[0]
        let newArr = arr.filter((item) => {return item._id !== res._id})
        setArr([res,...newArr])
        
    }

    // 确认删除分类
    const confirmDel = async (val) => {
        let {data} = await delAccountName({id:val._id})
        setArr([...data])
    }

    return (
        <div className="goods">
            <Card
                size="small"
                extra={<GoodsAdd setArr={setArr} arr={arr} />}
            >
                <Table 
                    dataSource={arr}
                    pagination={{total:len}}
                    onChange={handlePage}
                    rowKey={(record)=>{return record._id;}}
                >
                    <Column title="类别" dataIndex="accountName" />
                    <Column 
                        title="操作" 
                        dataIndex="address"
                        render={(_,val)=>{
                            return (
                                <>
                                    <Tag color="blue">
                                        <Popconfirm
                                            title={<AmendClassifyName handleView={handleView.bind(null,val)}/>}
                                            trigger="click"
                                            showCancel={false}
                                        >
                                            修改分类名
                                        </Popconfirm>
                                    </Tag>
                                    <Tag color="red">
                                        <Popconfirm
                                            title="是否删除此分类？"
                                            trigger="click"
                                            okText="确认"
                                            cancelText="取消"
                                            onConfirm={confirmDel.bind(null,val)}
                                        >
                                            删除分类
                                        </Popconfirm>
                                    </Tag>
                                </>
                            )
                        }}
                    />
                </Table>
            </Card>
        </div>
    )
}