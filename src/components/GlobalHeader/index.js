import router from 'umi/router';
import {connect} from 'dva';
import { Menu, Icon, Dropdown, Avatar} from 'antd';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

function GlobalHeader ({dispatch, user, notify, fetchingNotices, onNoticeClear}) {
  function onNoticeVisibleChange (type) {
    if (!type) return
    dispatch({
      type: 'config/clearNotifyCount'
    })
  }
  function onMenuClick ({key}) {
    if (key === 'logout') {
      localStorage.removeItem('loginfo')
      dispatch({type: 'global/setLogout'})
      router.push('/login')
    } else {
      console.log('修改密码')
    }
  }
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="password">
        <Icon type="setting" />修改密码
      </Menu.Item>
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header}>
      <div className={styles.right}>
        <NoticeIcon
          className={styles.action}
          count={notify.length}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
        />
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={user.avatar} />
            <span className={styles.name}>{user.name}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
}

export default connect(({global}) => {
  return {
    user: global.user,
    notify: global.notify
  }
})(GlobalHeader)