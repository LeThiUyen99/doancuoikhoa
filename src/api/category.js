import Resource from '@/api/resource'
import request from '@/utils/request'

class CategoryResource extends Resource {
  constructor() {
    super('api/public/category')
  }
  listCategory(query) {
    return request({
      url: `/${this.uri}/list_cms?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeCategory(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateCategory(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteCategory(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { CategoryResource as default }
