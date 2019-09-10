import {get, post} from '../utils/fetch'
export function getCategory(params) {
  return post('/getCategory', params)
}
export function addCategory(params) {
  return post('/addCategory', params)
}
export function updateCategory(params) {
  return post('/updateCategory', params)
}
export function deleteCategory(params) {
  return post('/deleteCategory', params)
}