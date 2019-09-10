import {menuData} from '../config'
export default {
  namespace: 'global',
  state: {
    login: false,
    user: {},
    menuData: []
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
  },
  effects: {
    *checkLogin(_, {put}) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('loginfo'))
        yield put({type: 'setLogin', userInfo})
      } catch (error) {
        console.log(error)
        console.log('没有获取到登陆信息')
      }
    }
  },
  subscriptions: {
    history({history, dispatch}) {
      dispatch({type: 'checkLogin'})
      // history.listen(({pathname}) => {
      //   dispatch({type: 'auth', action: {history, pathname}})
      // })
    },
  },
};
