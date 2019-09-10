import {
  Form,
  Input,
  Button
} from 'antd';

const CategoryForm = ({form, defaultData={}, addData, updateData}) => {

  function handleSubmit() {
    form.validateFieldsAndScroll((err, values) => {
      if (err) return
      defaultData.name ? updateData(values) : addData(values)
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="分类名称">
        {getFieldDecorator('name', {
          initialValue: defaultData.name,
          rules: [
            {
              required: true,
              message: '老铁,你要什么药品啊?',
            },
          ],
        })(<Input placeholder={'请输入名称'} />)}
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          {defaultData.name ? '修改': '添加'}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'editor' })(CategoryForm);
