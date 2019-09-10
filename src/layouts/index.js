import {useEffect} from 'react'
import { Layout } from 'antd';
import { connect } from 'dva';
import SiderMenu from "../components/SiderMenu/index"
import GlobalHeader from "../components/GlobalHeader";

const { Content, Header } = Layout;

function BasicLayout ({dispatch, login, history, children}) {
  if (!login && history.location.pathname !== '/login') {
    history.replace('/login')
    return null;
  }
  return (
    <Layout>
      <SiderMenu />
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader />
        </Header>
        {
          
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          { children }
          </Content>
        }
      </Layout>
    </Layout>
  );
}

export default connect(({global}) => {
  return {
    login: global.login,
  }
})(BasicLayout);
