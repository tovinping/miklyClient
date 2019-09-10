export function isUrl(path) {
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
  return reg.test(path);
}

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}
// {name: 'tvp', age: '3'} To ?name=tvp&age=3
export function paramsToString(obj) {
  if (!obj || typeof obj !== 'object') return ''
  const arr = Object.keys(obj)
  let string = '?'
  arr.forEach(key => {
    string += `${key}=${obj[key]}&`
  })
  return string.slice(0, -1)
}
// 检查antd表单是否为数字 
export function validNum(number,msg) {
  try {
    parseInt(number, 10)
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  } catch (error) {
    return {
      validateStatus: 'error',
      errorMsg: msg || '必需输入数字'
    };
  }
}
// 获取分类名称
export function getCategoryName(categorys, id) {
  const result = categorys.filter(item => item.id === id)
  return result[0] && result[0].name
}