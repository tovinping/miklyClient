import {get, post} from '../utils/fetch'
export function categorys(params) {
  return get('/categorys', params)
}
export function addcategory(params) {
  return post('/addcategory', params)
}
export function updatecategory(params) {
  return post('/updatecategory', params)
}
export function deletecategory(params) {
  return get('/deletecategory', params)
}