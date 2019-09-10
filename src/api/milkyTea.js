import {get, post} from '../utils/fetch'
export function getMilkyTea(params) {
  return post('/getMilkyTea', params)
}
export function addMilkyTea(params) {
  return post('/addMilkyTea', params)
}
export function updateMilkyTea(params) {
  return post('/updateMilkyTea', params)
}
export function deleteMilkyTea(params) {
  return post('/deleteMilkyTea', params)
}