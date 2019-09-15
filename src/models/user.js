import router from 'umi/router';
import {message} from 'antd'
import {login, getVerCode, addUser, getUser, deleteUser, getMailVerCode, updateUser} from '../api/user'
export default {
  namespace: 'user',
  state: {
    data: [],
    verCodeImg: '',
    regVerCodeImg: '', // 注册时用的验证码
  },
  effects: {
    *getData({action}, {call, put}) {
      const res = yield call(getUser, action)
      yield put({type: 'setData', data: res.data})
    },
    *deleteUser({action}, {call, put}) {
      const res = yield call(deleteUser, action)
      if (res) {
        message.success('删除用户成功')
        yield put({type: 'getData'})
      } else {
        message.error('删除用户失败')
      }
    },
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
    },
    *getRegVerCode({action}, {call, put}) {
      const res = yield call(getVerCode, action)
      if (!res) return
      yield put({type: 'setRegVerCodeImg', data: res.data})
    },
    *addUser({action}, {call, put}) {
      const res = yield call(addUser, action)
      if (!res) {
        yield put({type: 'getRegVerCode', action: {verCodeId: action.verCodeId}})
      } else {
        message.success('注册用户成功！')
        setTimeout(() => {
          router.push('/login')
        }, 1000);
      }
    },
    *getMailVerCode({action}, {call, put}) {
      const res = yield call(getMailVerCode, action)
      if (res) {
        message.success(res.data)
      }
    },
    *updateUser({action}, {call, put}) {
      const res = yield call(updateUser, action)
      if (res) {
        message.success('修改密码成功!')
        setTimeout(() => {
          router.push('/login')
        }, 1000);
      }
    },
  },
  reducers: {
    setData(state, {data}) {
      return {...state, data}
    },
    setVerCodeImg(state, {data}) {
      return {
        ...state,
        verCodeImg: data
      };
    },
    setRegVerCodeImg(state, {data}) {
      return {...state, regVerCodeImg: data}
    }
  },
};
