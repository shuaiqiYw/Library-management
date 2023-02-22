import { Layout, Modal, Button } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import "../assets/css/home.scss"
import { weather } from '../API/AxiosURL';
import SiderContent from '../Components/sider/SiderContent';
import { getSession, Re } from '../API/session';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function Home() {
    let [weat,setWeat] = useState({});
    const navigate = useNavigate()

    let loginName = useMemo(()=>getSession("key").loginName,[])
    if(!loginName){
        navigate("/")
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleExit = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 请求天气与地址
    useEffect(()=>{
        weather().then(({data})=>{
            setWeat(data)
        })
        
    },[])

    // 确定退出
    const confirm = () => {
        navigate("/")
        Re("key")
    }

    return (
        <div className='home'>
            <Layout>
                <Sider width={"256"}>
                    <SiderContent></SiderContent>
                </Sider>
                <Layout>
                    <Header>
                        <span className='welcome'>欢迎</span>
                        <span className='welcome name_color'>{loginName}</span>
                        <span className='exit' onClick={handleExit}>退出</span>
                    </Header>
                    <Content>
                        <div className='display_content'>
                            <p className='fl title'>{loginName}阅览</p>
                            <p className='fr weather'>
                                {weat.city}：
                                {weat.value?.date}
                                （{weat.value?.week}）
                                {weat.value?.narrative}
                            </p>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Modal 
             title="提示" 
             open={isModalOpen} 
             onOk={handleOk} 
             onCancel={handleCancel}
             footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
                <Button key="submit" type="primary" onClick={confirm}>
                    确定
                </Button>
             ]}
            >
                <p>是否确认退出系统？</p>
            </Modal>
        </div>
    )
}