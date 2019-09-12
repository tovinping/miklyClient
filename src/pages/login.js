import Link from 'umi/link';
import React, {useRef, useEffect} from 'react'
import {Input, Icon, Form, Button, Checkbox} from 'antd'
import { connect } from 'dva'
const md5 = require('crypto-js/md5')
// 验证码id使服务器知道是要和哪个验证码进行对比,这里只是简单的使用了一个随机数~~
const verCodeId = Math.random().toString(36).substr(2)

const Login = ({dispatch, verCodeImg, login}) => {
  if (login) {
    return <Link to='/'>你已经登陆了，请自觉一点点点我跳转到首页😂</Link>
  }
  const accountRef = useRef(null)
  const passwordRef = useRef(null)
  const verCodeRef = useRef(null)
  // 获取验证码
  useEffect(() => {
    dispatch({type: 'user/getVerCode', action: {verCodeId}})
  },[])
  function handleLogin() {
    const mail = accountRef.current.input.value
    const password = md5(passwordRef.current.input.value).toString()
    const verCode = verCodeRef.current.input.value.toLowerCase()
    dispatch({type: 'user/login', action: {mail, password, verCodeId, verCode}})
  }
  return (
    <Form style={{width: '300px', margin: '10% auto 0'}}>
      <Form.Item>
        <Input
          ref={accountRef}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="E-mail"
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
        <div style={{display: 'flex'}}>
          <Input
            style={{maxWidth: '60%',  marginRight: '5px'}}
            ref={verCodeRef}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
            placeholder="verCode"
          />
          <span 
            style={{flex: '1', height: '30px', cursor: 'pointer'}} 
            dangerouslySetInnerHTML={{__html: verCodeImg || '点击刷新验证码'}} 
            onClick={() => dispatch({type: 'user/getVerCode', action: {verCodeId}})}
          ></span>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" block onClick={handleLogin}>
          Log in
        </Button>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link to='/register'>register now!</Link>
          <Link to='/forgot'>Forgot password</Link>
        </div>
      </Form.Item>
    </Form>
  )
}
export default connect(({user, global}) => {
  return {
    verCodeImg: user.verCodeImg,
    login: global.login
  }
})(Login)