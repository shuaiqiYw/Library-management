import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import "../assets/css/home.scss"
import { weather } from '../API/AxiosURL';
import SiderContent from '../Components/sider/SiderContent';


const { Header, Sider, Content } = Layout;

export default function Home() {
    let [weat,setWeat] = useState({})
    // 请求天气与地址
    useEffect(()=>{
        weather().then(({data})=>{
            console.log(data);
            setWeat(data)
        })
    },[])

    return (
        <div className='home'>
            <Layout>
                <Sider width={"256"}>
                    <SiderContent></SiderContent>
                </Sider>
                <Layout>
                    <Header>
                        <span className='welcome'>欢迎</span>
                        <span className='welcome name_color'>yw</span>
                        <span className='exit'>退出</span>
                    </Header>
                    <Content>
                        <div className='display_content'>
                            <p className='fl title'>yw购买</p>
                            <p className='fr weather'>
                                {weat.city}：
                                {weat.value.date}
                                （{weat.value.week}）
                                {weat.value.narrative}
                            </p>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}