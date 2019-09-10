import {login} from '../api/user'
export default {
  namespace: 'user',
  state: {
    data: []
  },
  effects: {
    *login({action}, { call, put }) {
      const res = yield call(login, action);
      if (!res) return;
      localStorage.setItem('loginfo', JSON.stringify(res.data))
      yield put({type: 'global/setLogin', data: res.data})
    },
  },
  reducers: {
    setData(state) {
      return {
        ...state,
        login: true,
      };
    },
  },
};
