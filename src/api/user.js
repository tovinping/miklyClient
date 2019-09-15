import {get, post} from '../utils/fetch'

export function getUser(params) {
  return post('/getUser', params)
}
export function login(params) {
  return post('/login', params)
}
export function getVerCode(params) {
  return post('/getVerCode', params)
}
export function addUser(params) {
  return post('/addUser', params)
}
export function deleteUser(params) {
  return post('/deleteUser', params)
}
export function getMailVerCode(params) {
  return post('/getMailVerCode', params)
}
export function updateUser(params) {
  return post('/updateUser', params)
}