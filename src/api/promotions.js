import Resource from '@/api/resource'
import request from '@/utils/request'

class PromotionsResource extends Resource {
  constructor() {
    super('api/public/promotions')
  }
  PromotionsList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storePromotions(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updatePromotions(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deletePromotions(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { PromotionsResource as default }
