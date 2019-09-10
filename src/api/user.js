import {get, post} from '../utils/fetch'

export function login(params) {
  return post('/login', params)
}
export function getVerCode(params) {
  return post('/getVerCode', params)
}