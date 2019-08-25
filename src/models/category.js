import {categorys, addcategory, updatecategory, deletecategory} from '../api/category'
export default {
  namespace: 'category',
  state: {
    data: []
  },
  effects: {
    *getData({action}, { call, put }) {
      const data = yield call(categorys, action);
      yield put({type: 'setData', data});
    },
    *addData({action}, {call, put}) {
      const data = yield call(addcategory, action)
      yield put({type: 'getData'})
    },
    *updateData({action}, {call, put}) {
      const data = yield call(updatecategory, action)
      yield put({type: 'getData'})
    },
    *deleteData({action}, {call, put}) {
      const data = yield call(deletecategory, action)
      yield put({type: 'getData'})
    }
  },
  reducers: {
    setData(state, {data}) {
      const arr = data.map(item => ({...item, key: item.id}))
      return {
        ...state,
        data: arr,
      };
    },
  }
};
