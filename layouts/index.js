import { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from "../components/SiderMenu/index"
import { menuData } from '../common/menu';
import GlobalHeader from "../components/GlobalHeader";

const { Content, Header } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    return (
      <Layout>
        <SiderMenu
          menuData={menuData}
          pathname={location.pathname}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              currentUser={{
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 3,
              }}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            { children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
