export default {
  namespace: 'config',
  state: {
    user: {
      name: 'Tovinping',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 3,
    },
    menuData: [
      {
        name: '商品管理',
        path: '/products'
      },
      {
        name: '分类管理',
        path: '/categorys'
      },
      {
        name: '用户管理',
        path: '/users'
      }
    ],
    noticeData: {
      'info': {
        data: [],
        title: '通知',
        emptyText: '你已查看所有通知',
        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
      },
      'undo': {
        data: [],
        title: '待办',
        emptyText: '你已经完成所有待办',
        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg'
      }
    }
  }
};
