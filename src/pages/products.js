import {useState, useEffect} from 'react'
import {connect} from 'dva'
import { Table, Button, Modal, Divider } from 'antd';
import EditorPannel from '../components/Product/EditorPannel'
const {confirm} = Modal
const typeMap = {
  1: '小',
  2: '中',
  3: '大'
}
const Products = ({dispatch, data}) => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('add')
  const [item, setItem] = useState(null)
  useEffect(() => {
    dispatch({type: 'product/getData'})
  }, [])
  function addData(params) {
    setVisible(false)
    dispatch({type: 'product/addData', action: params})
  }
  function updateData(params) {
    const action = {...item, ...params}
    console.log(action)
    setVisible(false)
    setItem(null)
    dispatch({type: 'product/updateData', action})
  }
  function deleteData(params) {
    setVisible(false)
    dispatch({type: 'product/deleteData', action: params})
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
    setType('update')
    setItem(item)
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '简介',
      dataIndex: 'des'
    },
    {
      title: '原价',
      dataIndex: 'price'
    },
    {
      title: '现价',
      dataIndex: 'sales'
    },
    {
      title: '销量',
      dataIndex: 'salescount'
    },
    {
      title: '图片',
      dataIndex: 'photos',
      render: (photos) => {
        photos = JSON.parse(photos)
        return <img style={{width: 28, height: 28}} src={photos[0]} alt=""/>
      }
    },
    {
      title: '库存',
      dataIndex: 'inventory'
    },
    {
      title: '类型',
      dataIndex: 'type', // 类型(1:小2:中3:大)
      render: (type) => {
        return <span>{typeMap[type]}</span>
      }
    },
    {
      title: '操作',
      render: ({id, name}) => (
        <span>
          <a onClick={() => handleUpdate({id, name})}>维护</a>
          <Divider type="vertical" />
          <a style={{color: '#ff4d4f'}} onClick={()=> handleDelete(id)}>删除</a>
        </span>
      )
    }
  ]
  return <>
    <Table size={'small'} dataSource={data} columns={columns} pagination={false}/>
    <Button style={{marginTop: '10px'}} onClick={() => {setType('add');setVisible(true)}}>添加商品</Button>
    <Modal visible={visible} footer={null} onCancel={()=>setVisible(false)}>
      <EditorPannel type={type} addData={addData} updateData={updateData} />
    </Modal>
  </>
}
export default connect(({product}) => {
  return {
    data: product.data,
  }
})(Products)