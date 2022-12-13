import Resource from '@/api/resource'
import request from '@/utils/request'

class PromotionsProductResource extends Resource {
  constructor() {
    super('api/public/promotions_product')
  }
  PromotionsProductList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storePromotionsProduct(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deletePromotionsProduct(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { PromotionsProductResource as default }
