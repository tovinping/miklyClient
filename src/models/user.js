import router from 'umi/router';
import {login, getVerCode} from '../api/user'
export default {
  namespace: 'user',
  state: {
    data: [],
    verCodeImg: ''
  },
  effects: {
    *login({action}, { call, put }) {
      const res = yield call(login, action);
      if (!res) {
        yield put({type: 'getVerCode', action: {verCodeId: action.verCodeId}})
      } else {
        localStorage.setItem('loginfo', JSON.stringify(res.data))
        yield put({type: 'global/setLogin', data: res.data})
        router.push('/')
      }
    },
    *getVerCode({action}, {call, put}) {
      const res = yield call(getVerCode, action)
      if (!res) return
      yield put({type: 'setVerCodeImg', data: res.data})
    }
  },
  reducers: {
    setVerCodeImg(state, {data}) {
      return {
        ...state,
        verCodeImg: data
      };
    },
  },
};
