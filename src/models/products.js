import {message} from 'antd'
import {products, addproduct, updateproduct, deleteproduct} from '../api/product'
export default {
  namespace: 'product',
  state: {
    data: []
  },
  effects: {
    *getData({action}, { call, put }) {
      const result = yield call(products, action);
      yield put({type: 'setData', result});
    },
    *addData({action}, {call, put}) {
      const data = yield call(addproduct, action)
      if (!data.code) {
        message.error('添加商品失败啊')
        return;
      }
      yield put({type: 'getData'})
    },
    *updateData({action}, {call, put}) {
      const data = yield call(updateproduct, action)
      yield put({type: 'getData'})
    },
    *deleteData({action}, {call, put}) {
      const data = yield call(deleteproduct, action)
      yield put({type: 'getData'})
    }
  },
  reducers: {
    setData(state, {result}) {
      const {data} = result
      const arr = data.map(item => ({...item, key: item.id}))
      return {
        ...state,
        data: arr,
      };
    },
  }
};
