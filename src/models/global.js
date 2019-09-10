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
        if (!userInfo) {
          router.replace('/login')
        } else {
          yield put({type: 'setLogin', data: userInfo})
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
    // history({history, dispatch}) {
    //   history.listen(({pathname}) => {
    //     console.log(pathname)
    //     if (pathname !== '/login') {
    //       dispatch({type: 'checkLogin'})
    //     }
    //   })
    // },
  },
};
