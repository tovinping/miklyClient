export const domain = {
  development: 'http://127.0.0.1:4001',
  production: 'https://api/milky'
}
export const menuData = [
  {
    name: '商品管理',
    path: '/milkyTea',
    auth: true
  },
  {
    name: '分类管理',
    path: '/categorys',
    auth: true
  },
  {
    name: '用户管理',
    path: '/user',
    auth: true
  }
]

export const authWhiteList = ['/login', '/register', '/forgot']