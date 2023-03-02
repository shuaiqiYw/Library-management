import { useState, useEffect, useRef } from "react";
import { Card, Table, Tag, Popconfirm, Input, Button   } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";
import { getAcount, getPaging, updateAccountName } from "../../API/AxiosURL";
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
            <Input className="ClassifyInput" ref={inpRef}></Input>
            <Button type="primary" onClick={confirmAmend}>确认</Button>
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
        console.log(data);

        let middleArr = [...arr]
        setArr(
            middleArr.map(item=>{
                if(item._id === data[0]._id){
                    item.accountName = str
                    return item
                }else{
                    return item
                }
            })
        )
        
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
                                        >
                                            修改分类名
                                        </Popconfirm>
                                    </Tag>
                                    <Tag color="red">
                                        删除分类
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