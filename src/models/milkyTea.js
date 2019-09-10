import {getMilkyTea, addMilkyTea, updateMilkyTea, deleteMilkyTea} from '../api/milkyTea'
export default {
  namespace: 'milkyTea',
  state: {
    data: []
  },
  effects: {
    *getData({action}, { call, put }) {
      const res = yield call(getMilkyTea, action);
      yield put({type: 'setData', res});
    },
    *addData({action}, {call, put}) {
      const res = yield call(addMilkyTea, action)
      if (!res) return;
      yield put({type: 'getData'})
    },
    *updateData({action}, {call, put}) {
      const res = yield call(updateMilkyTea, action)
      if (!res) return;
      yield put({type: 'getData'})
    },
    *deleteData({action}, {call, put}) {
      const res = yield call(deleteMilkyTea, action)
      if (!res) return;
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
