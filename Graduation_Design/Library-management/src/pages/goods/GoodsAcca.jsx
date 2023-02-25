import React from "react";
import { Card } from 'antd';
import GoodsAdd from "../../Components/goods/GoodsAdd";

export default function GoodsAcca() {

    return (
        <div className="goods">
            <Card
                size="small"
                title="一级分类"
                extra={<GoodsAdd />}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    )
}