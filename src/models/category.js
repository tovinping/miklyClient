import {getCategory, addCategory, updateCategory, deleteCategory} from '../api/category'
export default {
  namespace: 'category',
  state: {
    data: [],
    status: 0 // 0,1,2 加载中,成功,失败
  },
  effects: {
    *getData({action}, { call, put }) {
      const res = yield call(getCategory, action);
      yield put({type: 'setData', res});
    },
    *addData({action}, {call, put}) {
      console.log(action)
      const res = yield call(addCategory, action)
      if (!res) return
      yield put({type: 'getData'})
    },
    *updateData({action}, {call, put}) {
      const res = yield call(updateCategory, action)
      if (!res) return
      yield put({type: 'getData'})
    },
    *deleteData({action}, {call, put}) {
      const res = yield call(deleteCategory, action)
      if (!res) return
      yield put({type: 'getData'})
    }
  },
  reducers: {
    setData(state, {res}) {
      if (!res) {
        return {...state}
      }
      const arr = res.data.map(item => ({...item, key: item.id}))
      return {
        ...state,
        data: arr,
      };
    },
  }
};
