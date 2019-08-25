import {get, post} from '../utils/fetch'
export function products(params) {
  return get('/products', params)
}
export function addproduct(params) {
  return post('/addproduct', params)
}
export function updateproduct(params) {
  return post('/updateproduct', params)
}
export function deleteproduct(params) {
  return get('/deleteproduct', params)
}