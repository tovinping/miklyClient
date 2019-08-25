import {
  Form,
  Input,
  Button
} from 'antd';

const CategoryForm = ({form, type, addData, updateData}) => {

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

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="名称">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '老铁,你要什么药品?',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'editor' })(CategoryForm);
