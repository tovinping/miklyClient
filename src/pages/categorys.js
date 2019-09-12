import {useState, useEffect} from 'react'
import {connect} from 'dva'
import { Table, Button, Modal, Divider } from 'antd';
import EditorPannel from '../components/Category/EditorPannel'
const {confirm} = Modal
const Category = ({dispatch, data}) => {
  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({})
  useEffect(() => {
    dispatch({type: 'category/getData'})
  }, [])
  function addData(params) {
    setVisible(false)
    dispatch({type: 'category/addData', action: params})
  }
  function updateData(params) {
    const action = {...selectData, ...params}
    setVisible(false)
    setSelectData({})
    dispatch({type: 'category/updateData', action})
  }
  function deleteData(params) {
    setVisible(false)
    dispatch({type: 'category/deleteData', action: params})
  }
  function handleDelete(id) {
    confirm({
      title: '是否删除?',
      onOk() {
        deleteData({id})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function handleUpdate(item) {
    setVisible(true)
    setSelectData(item)
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: ({id, name}) => (
        <span>
          <a onClick={() => handleUpdate({id, name})}>修改</a>
          <Divider type="vertical" />
          <a style={{color: '#ff4d4f'}} onClick={()=> handleDelete(id)}>删除</a>
        </span>
      )
    }
  ]
  return <>
    <Table size={'small'} dataSource={data} columns={columns} pagination={false}/>
    <Button style={{marginTop: '10px'}} onClick={() => setVisible(true)}>添加分类</Button>
    <Modal visible={visible} maskClosable={false} footer={null} onCancel={()=>setVisible(false)}>
      <EditorPannel defaultData={selectData} addData={addData} updateData={updateData} />
    </Modal>
  </>
}
export default connect(({category}) => {
  return {
    data: category.data,
  }
})(Category)