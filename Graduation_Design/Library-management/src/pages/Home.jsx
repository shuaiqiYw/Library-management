import { Layout, Modal, Button } from 'antd';
import "../assets/css/home.scss"
import SiderContent from '../Components/sider/SiderContent';
// ----------------
import useHome from '../hooks/useHome';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function Home() {

    let [weat,loginName,confirm,isModalOpen,setIsModalOpen] = useHome();

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
                            <p className='fl title'>{loginName}正在阅览中...</p>
                            <p className='fr weather'>
                                {/* {weat.data.city}： 
                                {weat.data.value?.date}
                                （{weat.data.value?.week}）
                                {weat.data.value?.narrative} */}
                            </p>
                        </div>
                        <div>
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