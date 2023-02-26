import { useState, useEffect } from "react";
import { Card } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";
import { getAcount } from "../../API/AxiosURL";

export default function GoodsAcca() {
    // 设置分类展示
    let [arr,setArr] = useState([{}])

    // 获取分类
    useEffect(()=>{
        getAcount().then(({data})=>{
            setArr(data)
        })
    },[])

    return (
        <div className="goods">
            <Card
                size="small"
                title="图书分类"
                extra={<GoodsAdd setArr={setArr} arr={arr} />}
            >
                {
                    arr.map((item,index)=>{
                        return (
                            <div key={index}>
                                {item.accountName}
                            </div>
                        )
                    })
                }
            </Card>
        </div>
    )
}