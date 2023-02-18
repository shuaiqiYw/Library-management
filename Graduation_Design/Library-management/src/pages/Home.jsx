import { Layout } from 'antd';
import "../assets/css/home.scss"
import SiderContent from '../Components/sider/SiderContent';


const { Header, Footer, Sider, Content } = Layout;

export default function Home() {

    return (
        <div className='home'>
            <Layout>
                <Sider width={"256"}>
                    <SiderContent></SiderContent>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
}