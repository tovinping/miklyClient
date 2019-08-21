import { Popover, Icon, Badge } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

function NoticeIcon (props) {

  const { className, count, onPopupVisibleChange } = props;
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const trigger = (
    <span className={noticeButtonClass}>
      <Badge count={count} className={styles.badge}>
        <Icon type="bell" className={styles.icon} />
      </Badge>
    </span>
  );
  return (
    <Popover
      placement="bottomRight"
      content={<h1>Test</h1>}
      popupClassName={styles.popover}
      trigger="click"
      onVisibleChange={onPopupVisibleChange}
    >
      {trigger}
    </Popover>
  );
}
export default NoticeIcon
