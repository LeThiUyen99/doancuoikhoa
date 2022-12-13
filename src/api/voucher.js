import Resource from '@/api/resource'
import request from '@/utils/request'

class VoucherResource extends Resource {
  constructor() {
    super('api/public/voucher')
  }
  voucherList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeVoucher(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateVoucher(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  voucherTypeList(query) {
    return request({
      url: `/${this.uri}/vouchers_type?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  deleteVoucher(resource) {
    return request({
      url: `/${this.uri}/delete?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  CustomList(query) {
    return request({
      url: `/${this.uri}/list_golfer_voucher?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeCustom(resource) {
    return request({
      url: `/${this.uri}/add_golfer?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateCustom(resource) {
    return request({
      url: `/${this.uri}/update_user?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteCustom(resource) {
    return request({
      url: `/${this.uri}/delete_user?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  activeGolfer(resource) {
    return request({
      url: `/${this.uri}/on_off_golfer?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  historyPromotionList(query) {
    return request({
      url: `/${this.uri}/history?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  detailVoucher(id) {
    return request({
      url: `/${this.uri}/detail?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  updateCondition(resource) {
    return request({
      url: `/${this.uri}/update_condition?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteCondition(id) {
    return request({
      url: `/${this.uri}/delete_condition?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { VoucherResource as default }
