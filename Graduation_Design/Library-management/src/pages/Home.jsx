import { Layout, Modal, Button } from 'antd';
import "../assets/css/home.scss"
import SiderContent from '../Components/sider/SiderContent';
// ----------------
import useHome from '../hooks/useHome';
import { Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function Home() {

    let [weat,loginName,confirm,isModalOpen,setIsModalOpen] = useHome();
    const local = useLocation()

    // header退出
    const handleExit = () => {
        setIsModalOpen(true);
    };
    // modal确定
    const handleOk = () => {
        setIsModalOpen(false);
    };
    // modal取消
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='home'>
            <Layout>
                <Sider width={"256"}>
                    <div style={{height:"32px",margin:"16px",fontSize:"22px",paddingLeft:"12px",color:"rgba(255, 255, 255, 0.6)"}}>图书管理系统</div>
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
                            <p className='fl title'>{local.state?.name}</p>
                            <p className='fr'>
                                {/* {weat.data.city}： 
                                {weat.data.value?.date}
                                （{weat.data.value?.week}）
                                {weat.data.value?.narrative} */}
                            </p>
                        </div>
                        <div className='center_page'>
                            <Outlet></Outlet>
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