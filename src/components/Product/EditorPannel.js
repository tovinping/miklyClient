import React, {useState, useRef} from 'react'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button
} from 'antd';
import EditorImgs from '../Common/EditorImgs'
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
const ProductForm = ({form, type, addData, updateData, defaultData}) => {
  const [imgs, setImgs] = useState([])
  const myRef = useRef(null)
  function handleSubmit() {
    form.validateFieldsAndScroll((err, values) => {
      if (err) return
      if (type === 'add') {
        addData(values)
      } else {
        updateData(values)
      }
    });
  };
  function uploaded(data) {
    setImgs(data)
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
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="类型">
        {getFieldDecorator('type', {
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        })(
          <Radio.Group>
            <Radio value="1">小</Radio>
            <Radio value="2">中</Radio>
            <Radio value="3">大</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="简介">
        {getFieldDecorator('des', {
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="原价">
        {getFieldDecorator('price', {
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
          rules: [
            {
              required: true,
              message: '数值,且不能为空',
            },
          ],
        })(<InputNumber min={1} max={10} />)}
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
        })(<EditorImgs imgList={imgs} ref={myRef} uploaded={uploaded} />)}
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'editor' })(ProductForm);
