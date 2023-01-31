import request from '@/utils/request'

export function loginUser(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getMenu() {
  return request({
    url: 'api/public/account/list_menu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
