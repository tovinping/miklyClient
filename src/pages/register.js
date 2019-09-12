import {useState, useEffect} from 'react'
import {connect} from 'dva'
import Link from 'umi/link';
import {Form, Button, Input, Checkbox, Row, Col, message} from 'antd'
const md5 = require('crypto-js/md5')
const verCodeId = Math.random().toString(36).substr(2)

const Register = ({form, dispatch, regVerCodeImg}) => {
  const [agreement, setAgreement] = useState(false)
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 14 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: { offset: 4 }
    },
  };
  useEffect(() => {
    dispatch({type: 'user/getRegVerCode', action: {verCodeId}})
  }, [])
  function verifyPhoneNumber(rule, value, callback) {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback('手鸡号码验证不队~没错!有错别字-_-')
    }
  }
  // 有点变态:密码长度只能为6，不要问我为什么，个人项目就是这么任性~
  function verifyFirstPassword(rule, value, callback) {
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6}$/;
    if (value && reg.test(value)) {
      callback()
    } else {
      callback('密码复杂度不足')
    }
  }
  function compareToFirstPassword(rule, value, callback) {
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  };
  function handleSubmit() {
    if (!agreement) {
      message.error('要先同意我们的协议呀~')
      return;
    }
    form.validateFieldsAndScroll((err, values) => {
      if (err) return
      values.password = md5(values.password).toString()
      values.verCodeId = verCodeId
      dispatch({type: 'user/addUser', action: values})
    });
  }
  return (
    <Form {...formItemLayout} style={{width: '555px', margin: '0 auto'}} onSubmit={handleSubmit}>
      <Form.Item label="E-mail">
        {getFieldDecorator('mail', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: verifyFirstPassword
            }
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: compareToFirstPassword
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Phone Number">
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: 'Please input your phone number!'
            },
            {
              validator: verifyPhoneNumber
            }],
        })(<Input addonBefore={'+86'} style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item label="Captcha">
        <Row>
          <Col span={8}>
            {getFieldDecorator('verCode', {
              rules: [{ required: true, message: 'Please input the captcha you got!' }],
            })(<Input />)}
          </Col>
          <Col span={8} style={{marginLeft: '10px'}}>
          <span 
            style={{display: 'block', height: '30px', marginTop: '5px', cursor: 'pointer'}} 
            dangerouslySetInnerHTML={{__html: regVerCodeImg || '点击刷新验证码'}} 
            onClick={() => dispatch({type: 'user/getRegVerCode', action: {verCodeId}})}
          ></span>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Checkbox checked={agreement} onChange={e => setAgreement(e.target.checked)}>
          I have read the <a href="https://baidu.com" target="view_frame">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" onClick={handleSubmit}>
          Register
        </Button>
        <Link style={{marginLeft: '20px'}} to="/login">Lgoin now!</Link>
      </Form.Item>
    </Form>
  )
}
const FormRegister = Form.create({ name: 'register' })(Register);
export default connect(({user}) => {
  return {
    regVerCodeImg: user.regVerCodeImg
  }
})(FormRegister)
