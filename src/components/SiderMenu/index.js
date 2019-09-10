import {connect} from 'dva'
import { Layout, Menu} from 'antd';
import Link from 'umi/link';
import styles from './index.less';

const { Sider } = Layout;

function SiderMenu ({menuData, pathname}) {
  function getNavMenuItems() {
    return menuData.map(({path, name}) => 
      <Menu.Item key={path}>
        <Link to={path}>{name}</Link>
      </Menu.Item>
    )
  }
  const selectedKeys = [pathname]
  return (
    <Sider
      width={150}
      className={styles.sider}
    >
      <div className={styles.logo} key="logo">
        <Link to="/">
          <h1>管理后台</h1>
        </Link>
      </div>
      <Menu
        key="Menu"
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        style={{ padding: '16px 0', width: '100%' }}
      >
        {getNavMenuItems()}
      </Menu>
    </Sider>
  );
}

export default connect(({global, router}) => {
  return {
    menuData: global.menuData,
    pathname: router.location.pathname
  }
})(SiderMenu)
