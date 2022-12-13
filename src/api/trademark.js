import Resource from '@/api/resource'
import request from '@/utils/request'

class TrademarkResource extends Resource {
  constructor() {
    super('api/public/trademark')
  }
  listTrademark(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeTrademark(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateTrademark(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteTrademark(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  listTrademarkOption(query) {
    return request({
      url: `/${this.uri}/list_option?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { TrademarkResource as default }
