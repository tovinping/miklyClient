import {message} from 'antd'
import {domain} from '../config'
import {paramsToString} from '../utils'
const baseUrl = domain[process.env.NODE_ENV]
export function get(uri, params) {
  const paramsStr = paramsToString(params)
  const url = uri.indexOf('http') >= 0 ? uri : baseUrl + uri
  return fetch(`${url}${paramsStr}`, {
    method: 'get'
  }).then(res => {
    return res.json()
  }).catch(err => {
    console.log(err)
    throw {data: null}
  })
}
export const post = (uri, params) => {
  const url = uri.indexOf('http') >= 0 ? uri : baseUrl + uri
  return fetch(`${url}`, {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: JSON.stringify(params)
  }).then(async res => {
    if (res.status !== 200) {
      message.error('请求失败~')
    } else {
      const data = await res.json()
      if (data.code === 1) {
        return data
      }
      message.error(data.msg)
    }
  }).catch(err => {
    console.log(err)
    message.error('请求失败~')
  })
}