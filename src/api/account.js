import Resource from '@/api/resource'
import request from '@/utils/request'

class AccountResource extends Resource {
  constructor() {
    super('api/public/account')
  }
  AccountList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeAccount(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateAccount(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  ChangePassword(resource) {
    return request({
      url: `/${this.uri}/change_pass?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  changeProfile(resource) {
    return request({
      url: `/${this.uri}/update_profile?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  profileList() {
    return request({
      url: `/${this.uri}/get_profile?${this.getVerify()}`,
      method: 'get'
    })
  }
  forgotPassword(resource) {
    return request({
      url: `/${this.uri}/forgot_password?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  SendEmail(resource) {
    return request({
      url: `/${this.uri}/get_captcha_verify?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteAccount(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  accountTelesale() {
    return request({
      url: `${this.uri}/list_telesale?${this.getVerify()}`,
      method: 'get'
    })
  }
  searchVga(vga) {
    return request({
      url: `${this.uri}/search_vga?vga=${vga}&${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { AccountResource as default }
