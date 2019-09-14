import {useEffect} from 'react'
import {connect} from 'dva'
import {Table, Modal} from 'antd'
const {confirm} = Modal

const User = ({data, dispatch}) => {
  useEffect(() => {
    dispatch({type: 'user/getData'})
  }, [])
  function handleDelete(id) {
    confirm({
      title: '是否删除?',
      onOk() {
        dispatch({type: 'user/deleteUser', action: {id}})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '级别',
      dataIndex: 'level'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '头像',
      dataIndex: 'avatar'
    },
    {
      title: '操作',
      render: ({id, name}) => (
        <a style={{color: '#ff4d4f'}} onClick={()=> handleDelete(id)}>删除</a>
      )
    }
  ]
  return <Table size={'small'} rowKey="id" dataSource={data} columns={columns} pagination={false}/>
}
export default connect(({user}) => {
  return {
    data: user.data
  }
})(User)