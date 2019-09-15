import React, {useState} from 'react'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
  Select
} from 'antd';
import EditorImgs from '../Common/EditorImgs'

const {Option} = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 3 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};

const MilkyTeaForm = ({form, defaultData, categorys, addSubmit, updateSubmit, }) => {
  const defaultImgs = defaultData.photos ? JSON.parse(defaultData.photos) : []
  const [imgs, setImgs] = useState(defaultImgs)
  function handleSubmit() {
    form.validateFieldsAndScroll((err, values) => {
      if (err) return
      if (!defaultData.name) {
        addSubmit(values)
      } else {
        updateSubmit(values)
      }
    });
  };
  function uploaded(data) {
    setImgs(data)
    form.setFieldsValue({
      photos: data
    })
  }
  function validImgs() {
    if(imgs.length) {
      return JSON.stringify(imgs)
    } else {
      return undefined;
    }
  };
  const { getFieldDecorator } = form;
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="名称">
        {getFieldDecorator('name', {
          initialValue: defaultData.name,
          rules: [
            {
              required: true,
              message: '名称不能为空',
            },
          ],
        })(<Input autoComplete="off" />)}
      </Form.Item>
      <Form.Item label="简介">
        {getFieldDecorator('description', {
          initialValue: defaultData.description,
          rules: [
            {
              required: true,
              message: '简介不能为空',
            },
          ],
        })(<Input autoComplete="off"/>)}
      </Form.Item>
      <Form.Item label="分类">
          {getFieldDecorator('categoryId', {
            initialValue: defaultData.categoryId,
            rules: [{ required: true, message: '分类必填' }],
          })(
            <Select
              placeholder="请选择分类..."
            >
              {categorys.map(cate => <Option key={cate.id} value={cate.id}>{cate.name}</Option>)}
            </Select>,
          )}
        </Form.Item>
      <Form.Item label="原价">
        {getFieldDecorator('price', {
          initialValue: defaultData.price,
          rules: [
            {
              required: true,
              message: '数值,且不能为空',
            },
          ],
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="现价">
        {getFieldDecorator('sales', {
          initialValue: defaultData.sales,
          rules: [
            {
              required: true,
              message: '数值,且不能为空',
            },
          ],
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="库存">
        {getFieldDecorator('inventory', {
          initialValue: defaultData.inventory,
          rules: [
            {
              required: true,
              message: '数值,且不能为空',
            },
          ],
        })(<InputNumber min={1} max={10} />)}
      </Form.Item>
      <Form.Item label="大小">
        {getFieldDecorator('size', {
          initialValue: defaultData.size,
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        })(
          <Radio.Group>
            <Radio value={1}>小</Radio>
            <Radio value={2}>中</Radio>
            <Radio value={3}>大</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="图片">
        {getFieldDecorator('photos', {
          valuePropName: 'filesList',
          normalize: validImgs,
          rules: [
            {
              required: true,
              message: '这个图片校验我也是醉了'
            }
          ]
        })(<EditorImgs imgList={imgs} uploaded={uploaded} />)}
      </Form.Item>
      <Form.Item >
        <Button type="primary">
          {defaultData.name? '修改': '添加'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'editor' })(MilkyTeaForm);
