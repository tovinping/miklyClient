import {get, post} from '../utils/fetch'
import OSS from 'ali-oss'

export function getSts(params) {
  return get('https://tovinping.cn/api/common/getsts', params)
}
export function uploadImg(file) {
  return getSts().then(data => {
    const client = new OSS({
      region: data.region,
      accessKeyId: data.AccessKeyId,
      accessKeySecret: data.AccessKeySecret,
      stsToken: data.SecurityToken,
      bucket: data.bucket
    })
    const name = 'images/milkyClient-' + Math.random().toString(36).substr(2) + file.name
    return client.put(name, file)
  })
}