import {get, post} from '../utils/fetch'

export function login(params) {
  return post('/login', params)
}