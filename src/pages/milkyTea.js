import {useState, useEffect} from 'react'
import {connect} from 'dva'
import { Table, Button, Modal, Divider } from 'antd';
import EditorPannel from '../components/MilkyTea/EditorPannel'
import {getCategoryName} from '../utils'
const {confirm} = Modal
const typeMap = {
  1: '小',
  2: '中',
  3: '大'
}
const Products = ({dispatch, data, categorys}) => {
  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({})
  useEffect(() => {
    dispatch({type: 'milkyTea/getData'})
  }, [])
  useEffect(() => {
    if (!categorys.length) {
      dispatch({type: 'category/getData'})
    }
  }, [])
  function addData(params) {
    setVisible(false)
    dispatch({type: 'milkyTea/addData', action: params})
  }
  function updateData(params) {
    const action = {...selectData, ...params}
    setVisible(false)
    dispatch({type: 'milkyTea/updateData', action})
    setSelectData({})
  }
  function deleteData(params) {
    setVisible(false)
    dispatch({type: 'milkyTea/deleteData', action: params})
  }
  function handleRowDel(id) {
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
  function handleRowUpdate(row) {
    setSelectData(row)
    setVisible(true)
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '简介',
      dataIndex: 'description'
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
      title: '大小',
      dataIndex: 'size', // 1:小2:中3:大
      render: (type) => {
        return <span>{typeMap[type]}</span>
      }
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render(type) {
        return (<span>{getCategoryName(categorys, type)}</span>)
      }
    },
    {
      title: '操作',
      render: (row) => (
        <span>
          <a onClick={() => handleRowUpdate(row)}>维护</a>
          <Divider type="vertical" />
          <a style={{color: '#ff4d4f'}} onClick={()=> handleRowDel(row.id)}>删除</a>
        </span>
      )
    }
  ]
  return <>
    <Table size={'small'} dataSource={data} columns={columns} pagination={false}/>
    <Button style={{marginTop: '10px'}} onClick={() => {setVisible(true)}}>添加商品</Button>
    <Modal visible={visible} maskClosable={false} destroyOnClose={true} footer={null} onCancel={()=>setVisible(false)}>
      <EditorPannel defaultData={selectData} categorys={categorys} addSubmit={addData} updateSubmit={updateData} />
    </Modal>
  </>
}
export default connect(({milkyTea, category}) => {
  return {
    data: milkyTea.data,
    categorys: category.data
  }
})(Products)