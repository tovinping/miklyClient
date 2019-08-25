import {domain} from '../config'
import {paramsToString} from '../utils'
const baseUrl = domain[process.env.NODE_ENV]
console.log(baseUrl)
export function get(uri, params) {
  const paramsStr = paramsToString(params)
  return fetch(`${baseUrl}${uri}${paramsStr}`, {
    method: 'get'
  }).then(res => {
    return res.json()
  }).catch(err => {
    console.log(err)
  })
}
export const post = (uri, params) => {
  return fetch(`${baseUrl}${uri}`, {
    method: 'post',
    body: JSON.stringify(params)
  }).then(res => {
    return res.json()
  }).catch(err => {
    console.log(err)
  })
}