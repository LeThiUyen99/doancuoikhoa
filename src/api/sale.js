import Resource from '@/api/resource'
import request from '@/utils/request'

class SaleResource extends Resource {
  constructor() {
    super('api/public/sale')
  }
  saleList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  updateSale(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updatePriority(resource) {
    return request({
      url: `/${this.uri}/update_priority?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  comboList(query) {
    return request({
      url: `/${this.uri}/list_combo?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  fillterProduct(query) {
    return request({
      url: `api/public/product/list_cms?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  adsList(resource) {
    // const keys = Object.keys(resource)
    // const query = keys.map(d => {
    //   return `${d}=${resource[d]}`
    // }).join(('&'))
    // console.log('..................quey ', query)
    return request({
      url: `/${this.uri}/list_ads?${this.getVerify()}`,
      method: 'get',
      params: resource
    })
  }
  updateAds(resource) {
    return request({
      url: `/${this.uri}/update_ads_cms?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  createAds(resource) {
    return request({
      url: `/${this.uri}/create_ads_cms?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteAds(id) {
    return request({
      url: `/${this.uri}/ads_delete?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  filterAds(active, page = 1, limit = 10) {
    return request({
      url: `/${this.uri}/filter_ads?active=${active}&page=${page}&limit=${limit}&${this.getVerify()}`
    })
  }
  positionAds(id, position = 0) {
    return request({
      url: `/${this.uri}/ads_update_position?id=${id}&position=${position}&${this.getVerify()}`,
      method: 'get'
    })
  }
  updateCombo(resource) {
    return request({
      url: `/${this.uri}/update_combo_cms?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
}

export { SaleResource as default }
