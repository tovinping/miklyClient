import React, {useRef} from 'react'
import {Input, Icon, Form, Button} from 'antd'
import { connect } from 'dva'
const md5 = require('crypto-js/md5')

const Login = ({dispatch}) => {
  console.log('pageLogin')
  const accountRef = useRef(null)
  const passwordRef = useRef(null)
  function handleLogin() {
    const account = accountRef.current.input.value
    const password = md5(passwordRef.current.input.value).toString()
    dispatch({type: 'user/login', action: {account, password}})
  }
  return (
    <Form style={{width: '300px', margin: '10% auto 0'}}>
      <Form.Item>
        <Input
          ref={accountRef}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item>
        <Input
          ref={passwordRef}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" block onClick={handleLogin}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
export default connect(() => new Object())(Login)