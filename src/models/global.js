import router from 'umi/router'
import {menuData} from '../config'
export default {
  namespace: 'global',
  state: {
    login: false,
    user: {},
    menuData: [],
    notify: []
  },
  effects: {
    *checkLogin(_, {put}) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('loginfo'))
        if (userInfo) {
          yield put({type: 'setLogin', data: userInfo})
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.log(error)
        console.log('没有获取到登陆信息')
      }
    }
  },
  reducers: {
    setLogin(state, {data}) {
      return {
        ...state,
        login: true,
        user: data,
        menuData
      };
    },
    setLogout(state) {
      return {...state, login: false, user: {}, menuData: []}
    }
  },
  subscriptions: {
    history({history, dispatch}) {
      // listen回调函数会执行三次，那还玩个毛啊
      // history.listen(({pathname}) => {
      //   console.log(pathname)
      // })
    },
  },
};
