import { useState, useEffect } from "react";
import { Card, Table, Tag } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";
import { getAcount, getPaging } from "../../API/AxiosURL";
import "../../assets/css/account.scss"

let len = 0
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
                                        修改分类名
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