import Link from 'umi/link';
import React, {useRef} from 'react'
import {Input, Icon, Form, Button, message} from 'antd'
import { connect } from 'dva'
const md5 = require('crypto-js/md5')
const verCodeId = Math.random().toString(36).substr(2)

const Forgot = ({dispatch, verCodeImg, login}) => {
  if (login) {
    return <Link to='/'>你已经登陆了，请自觉一点点点点我跳转到首页😂</Link>
  }
  const accountRef = useRef(null)
  const phoneRef = useRef(null)
  const passwordRef = useRef(null)
  const verCodeRef = useRef(null)
  function handleUpdate() {
    // register页面有校验,为了节省时间这里就不做校验了
    const mail = accountRef.current.input.value
    const phone = phoneRef.current.input.value
    const password = md5(passwordRef.current.input.value).toString()
    const verCode = verCodeRef.current.input.value.toLowerCase()
    if (!mail || !phone || !password || ! verCode){
      message.error('信息输入不完整!!!')
    } else {
    dispatch({type: 'user/updateUser', action: {mail, phone, password, verCodeId, verCode}})
    }
  }
  function handleGetVerCode() {
    const mail = accountRef.current.input.value
    const phone = phoneRef.current.input.value
    dispatch({type: 'user/getMailVerCode', action: {verCodeId, mail, phone}})
  }
  return (
    <Form style={{width: '300px', margin: '10% auto 0'}}>
      <Form.Item>
        <Input
          ref={accountRef}
          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入注册邮箱"
        />
      </Form.Item>
      <Form.Item>
        <Input
          ref={phoneRef}
          prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入注册手机号"
        />
      </Form.Item>
      <Form.Item>
        <Input
          ref={passwordRef}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="请输入新密码"
        />
      </Form.Item>
      <Form.Item>
        <div style={{display: 'flex'}}>
          <Input
            style={{maxWidth: '60%',  marginRight: '5px'}}
            ref={verCodeRef}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
            placeholder="填写邮箱验证码"
          />
          <Button 
            type="primary" 
            onClick={handleGetVerCode}
          >获取验证码</Button>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" block onClick={handleUpdate}>
          确认
        </Button>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link to='/login'>Login now!</Link>
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
})(Forgot)