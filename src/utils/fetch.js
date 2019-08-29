import {domain} from '../config'
import {paramsToString} from '../utils'
const baseUrl = domain[process.env.NODE_ENV]
console.log(baseUrl)
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
    body: JSON.stringify(params)
  }).then(res => {
    return res.json()
  }).catch(err => {
    console.log(err)
  })
}