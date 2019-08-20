import React from 'react';
import { Menu, Icon, Dropdown, Avatar} from 'antd';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

export default ({currentUser, fetchingNotices, onNoticeVisibleChange, onMenuClick, onNoticeClear}) => {
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item>
        <Icon type="setting" />修改密码
      </Menu.Item>
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
      </Menu.Item>
    </Menu>
  );
  const noticeData = {}
  return (
    <div className={styles.header}>
      <div className={styles.right}>
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
        >
          <NoticeIcon.Tab
            list={noticeData['通知']}
            title="通知"
            emptyText="你已查看所有通知"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            list={noticeData['待办']}
            title="待办"
            emptyText="你已完成所有待办"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
            <span className={styles.name}>{currentUser.name}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
}
