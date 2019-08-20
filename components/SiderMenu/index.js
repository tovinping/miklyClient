import React, { PureComponent } from 'react';
import { Layout, Menu} from 'antd';
import Link from 'umi/link';
import styles from './index.less';

const { Sider } = Layout;

export default class MySiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData
    this.flatMenuKeys = props.menuData.map(item => item.path)
    this.state = {
      openKeys: [],
    };
  }
  /**
   * 获得菜单子节点
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData.map(({path, name}) => 
      <Menu.Item key={path}>
        <Link to={path}>{name}</Link>
      </Menu.Item>
    )
  };
  getSelectedMenuKeys = () => {
    return [this.props.pathname]
  };
  render() {
    const { openKeys } = this.state;
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
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
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}
