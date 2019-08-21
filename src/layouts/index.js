import { Layout } from 'antd';
import SiderMenu from "../components/SiderMenu/index"
import GlobalHeader from "../components/GlobalHeader";

const { Content, Header } = Layout;

function BasicLayout (props) {
  return (
    <Layout>
      <SiderMenu />
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader />
        </Header>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          { props.children }
        </Content>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
