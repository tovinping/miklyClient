/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

export const menuData = [
  {
    name: '分析页',
    path: '/analysis'
  },
  {
    name: '监控页',
    path: '/monitor'
  },
  {
    name: '工作台',
    path: '/workplace'
  }
]

export const getMenuData = () => formatter(menuData);
