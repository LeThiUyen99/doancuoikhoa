import Resource from '@/api/resource'
import request from '@/utils/request'

class ShopResource extends Resource {
  constructor() {
    super('api/public/shop')
  }
  shopList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  shopDetail(id) {
    return request({
      url: `/${this.uri}/detail/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  detailShop(id) {
    return request({
      url: `/${this.uri}/detail_cms_v2?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  storeShop(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateShop(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteShop(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  getProvinceList() {
    return request({
      url: `api/public/address_ship/viettel_list_province_or_city?${this.getVerify()}`,
      method: 'get'
    })
  }
  getDistrictList(query) {
    return request({
      url: `api/public/address_ship/viettel_list_district?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getWardsList(query) {
    return request({
      url: `api/public/address_ship/viettel_list_wards?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getFilterList(query) {
    return request({
      url: `api/public/shop/search?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  listShopOption(query) {
    return request({
      url: `api/public/shop/list_option?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ShopResource as default }
